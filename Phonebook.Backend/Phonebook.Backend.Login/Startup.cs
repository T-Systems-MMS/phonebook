using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.WsFederation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Phonebook.Backend.Login
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddAuthentication(sharedOptions =>
                {
                    sharedOptions.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    sharedOptions.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    sharedOptions.DefaultChallengeScheme = WsFederationDefaults.AuthenticationScheme;
                })
                .AddWsFederation(options =>
                {
                    // For more information see here: https://docs.microsoft.com/en-us/aspnet/core/security/authentication/ws-federation?view=aspnetcore-3.1
                    // MetadataAddress represents the Active Directory instance used to authenticate users.
                    // For Azure AD this value is: https://login.microsoftonline.com/{tenantid}/federationmetadata/2007-06/federationmetadata.xml
                    options.MetadataAddress = Configuration["wsfed:MetadataAddress"];
                    // The return URL after the comeback from the identity provider
                    options.Wreply = $"https://{Configuration["wsfeed:FrontendProxyDomain"]}/signin-wsfed";
                    // Wtrealm is the app's identifier in the Active Directory instance.
                    // For ADFS, use the relying party's identifier, its WS-Federation Passive protocol URL:
                    options.Wtrealm = Configuration["wsfed:ApplicationIdentifier"];
                    // this is mostly required to support azure AD 😏
                    options.Wtrealm = $"spn:{Configuration["wsfed:ApplicationIdentifier"]}";
                })
                .AddCookie();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}")
                .RequireAuthorization();
            });
        }
    }
}
