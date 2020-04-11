using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.WsFederation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Primitives;
using Phonebook.Source.PeopleSoft.Models.Context;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            Env = env;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Env { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddResponseCompression(o => o.Providers
            .Add(new GzipCompressionProvider(new GzipCompressionProviderOptions()
            {
                Level = System.IO.Compression.CompressionLevel.Optimal
            })));
            services.AddControllers().AddJsonOptions(o => o.JsonSerializerOptions.PropertyNamingPolicy = null);
            if (Configuration.GetValue<bool>("useSeeding"))
            {
                services.AddDbContext<ModelContext, SeedingContext>(options =>
                    options
                        .UseInMemoryDatabase("PeopleSoft")
                        .ConfigureWarnings(w => w.Throw(RelationalEventId.QueryClientEvaluationWarning))
                        .EnableSensitiveDataLogging(true)
                        );

            }
            else
            {
                services.AddDbContext<ModelContext>(options =>
                   options
                       .UseOracle(Configuration.GetConnectionString("PeopleSoftDatabase"), oracleOptionsAction => oracleOptionsAction.UseRelationalNulls(false))
                       .ConfigureWarnings(w => w.Throw(RelationalEventId.QueryClientEvaluationWarning))
               );
            }

#if DEBUG
            Microsoft.IdentityModel.Logging.IdentityModelEventSource.ShowPII = true;
#endif
            if (Configuration.GetValue<bool>("useAnonymos"))
            {
                if (!Configuration.GetValue<bool>("useSeeding"))
                {
                    throw new NotSupportedException("It is not supported to use anonymos auth and real data! Please also enable 'useSeeding'!");
                }
                services
                    .AddAuthentication("noAuth")
                    .AddScheme<NoAuthOptions, NoAuthHandler>("noAuth", o => { });
            }
            else
            {
                AddWsFederation(services);
            }
        }


        private void AddWsFederation(IServiceCollection services)
        {
            services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                sharedOptions.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                sharedOptions.DefaultChallengeScheme = WsFederationDefaults.AuthenticationScheme;

            })
                          .AddWsFederation(options =>
                          {
                              // MetadataAddress represents the Active Directory instance used to authenticate users.
                              options.MetadataAddress = Configuration.GetValue<string>("WsFederationConfig:MetadataAddress"); ;

                              var appId = Configuration.GetValue<string>("WsFederationConfig:ApplicationId");


                              // Wtrealm is the app's identifier in the Active Directory instance.
                              // For ADFS, use the relying party's identifier, its WS-Federation Passive protocol URL:							  
                              options.Wtrealm = $"{appId}";

                              // maybe the following is requiered for azure. check this alter.
                              //options.Wtrealm = $"spn:{appId}";
                              options.AllowUnsolicitedLogins = true;
                              // https://stackoverflow.com/questions/28627061/owin-ws-federation-setting-up-token-sliding-expiration
                              options.UseTokenLifetime = false;

                              options.ClaimsIssuer = Configuration.GetValue<string>("WsFederationConfig:ClaimsIssuer");
                              options.Events.OnRedirectToIdentityProvider = (c) =>
                              {
                                  var hostname = string.Empty;
                                  if (string.IsNullOrWhiteSpace(c.Request.Headers["Referer"]) == false)
                                  {
                                      var uri = new Uri(c.Request.Headers["Referer"]);
                                      hostname = $"{uri.Host}:{uri.Port}";
                                  }
                                  else
                                  {
                                      hostname = c.Request.Host.ToString();
                                  }
                                  c.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                                  c.ProtocolMessage.Wreply = $"https://{hostname}/signin-wsfed";
                                  c.Properties.RedirectUri = $"{c.Request.Headers["Referer"]}";
                                  c.Response.Headers.Add(new KeyValuePair<string, StringValues>("Location", new StringValues(c.ProtocolMessage.CreateSignInUrl())));
                                  c.HandleResponse();
                                  return Task.CompletedTask;
                              };

                              options.Events.OnAuthenticationFailed = (c) =>
                              {
                                  var hostname = string.Empty;
                                  if (string.IsNullOrWhiteSpace(c.Request.Headers["Referer"]) == false)
                                  {
                                      var uri = new Uri(c.Request.Headers["Referer"]);
                                      hostname = $"{uri.Host}:{uri.Port}";
                                  }
                                  else
                                  {
                                      hostname = c.Request.Host.ToString();
                                  }
                                  c.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                                  c.ProtocolMessage.Wreply = $"https://{hostname}/signin-wsfed";
                                  c.Properties.RedirectUri = $"{c.Request.Headers["Referer"]}";
                                  c.Response.Headers.Add(new KeyValuePair<string, StringValues>("Location", new StringValues(c.ProtocolMessage.CreateSignInUrl())));
                                  c.HandleResponse();
                                  return Task.CompletedTask;
                              };

                              // For AAD, use the App ID URI from the app registration's Properties blade:
                              //options.Wtrealm = "https://wsfedsample.onmicrosoft.com/63e4796f-9e4e-40f1-928b-d4efd0642d0d";

                          })
                          .AddCookie();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider services)
        {
            if (Configuration.GetValue<bool>("useSeeding"))
            {
                services.GetRequiredService<ModelContext>().Database.EnsureCreated();
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseRouting();

            app.UseCors();
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseResponseCompression();

            app.UseEndpoints(endpoints =>
             {
                 endpoints.MapControllers();
             });
        }
    }
}
