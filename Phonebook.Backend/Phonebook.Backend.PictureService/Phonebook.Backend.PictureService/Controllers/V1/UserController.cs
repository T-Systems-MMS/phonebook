using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Phonebook.Backend.PictureService.Controllers.V1
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    [EnableCors("AllowDomainList")]
    [ApiVersion("1.0")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> logger;

        public UserController(ILogger<UserController> logger)
        {
            this.logger = logger;
        }
        /// <summary>
        /// Displays the Username of the currently logged in User (via NTLM)
        /// </summary>
        /// <returns>Domain/Username</returns>
        /// <remarks>You have to be logged in via NTLM authentication</remarks>
        [HttpGet]
        [Route("whoami")]
        [ProducesResponseType(typeof(string), 200)]
        public string  WhoAmI()
        {
            var user = HttpContext.User;
            logger.LogInformation($"Log user {user.Identity.Name}");
            return '"' + user.Identity.Name + '"';
        }

    }
}