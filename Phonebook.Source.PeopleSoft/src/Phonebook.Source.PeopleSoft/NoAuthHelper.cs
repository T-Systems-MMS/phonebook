using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft
{
    public class NoAuthOptions : AuthenticationSchemeOptions
    {

    }
    public class NoAuthHandler : AuthenticationHandler<NoAuthOptions>
    {
        public NoAuthHandler(
            IOptionsMonitor<NoAuthOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock) : base(options, logger, encoder, clock)
        {
        }
#pragma warning disable CS1998 // The source implementation requiered Async
        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
#pragma warning restore CS1998 // The source implementation requiered Async
        {
            var principal = new ClaimsPrincipal();
            principal.AddIdentity(new ClaimsIdentity("noAuth", "Test User", "default"));
            Context.User = principal;
            return AuthenticateResult.Success(new AuthenticationTicket(principal, "noAuth"));
        }
    }
}
