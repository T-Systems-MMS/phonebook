using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.WsFederation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Phonebook.Backend.PictureService.Helpers
{
    internal static class AdfsHelper
    {
        internal static void AddWsFederation(IServiceCollection services, IConfiguration configuration)
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
                              options.MetadataAddress = configuration.GetValue<string>("WsFederationConfig:MetadataAddress"); ;

                              var appId = configuration.GetValue<string>("WsFederationConfig:ApplicationId");


                              // Wtrealm is the app's identifier in the Active Directory instance.
                              // For ADFS, use the relying party's identifier, its WS-Federation Passive protocol URL:							  
                              options.Wtrealm = $"{appId}";

                              // maybe the following is requiered for azure. check this alter.
                              //options.Wtrealm = $"spn:{appId}";
                              options.AllowUnsolicitedLogins = true;
                              // https://stackoverflow.com/questions/28627061/owin-ws-federation-setting-up-token-sliding-expiration
                              options.UseTokenLifetime = false;

                              options.ClaimsIssuer = configuration.GetValue<string>("WsFederationConfig:ClaimsIssuer");
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
    }
}
