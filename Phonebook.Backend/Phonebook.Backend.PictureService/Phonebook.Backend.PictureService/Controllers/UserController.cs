using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Phonebook.Backend.PictureService.Controllers
{
    /// <summary>
    /// Controls User specific actions.
    /// Until now only returns the username of the authenticated user.
    /// </summary>
    [Authorize]
    [EnableCors("AllowDomainList")]
    [Route("[controller]")]
    public class UserController : Controller
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
        public ActionResult<WhoAmIReturnValue> WhoAmI([FromQuery] VersionQuery query)
        {
            var user = HttpContext.User;
            logger.LogInformation($"Log user {user.Identity.Name}");

            if(query.version == 2)
            {
                var returnValue = new WhoAmIReturnValue(user.Identity.Name, Helpers.HelpersThing.DoesFileExist(user.Identity.Name.Split("\\")[1]));
                return returnValue;
            }
            return Json(user.Identity.Name);
        }
    }

    public class WhoAmIReturnValue
    {
        public string user { get; set; }
        public Boolean hasPicture { get; set; }

        public WhoAmIReturnValue(string user, bool hasPicture)
        {
            this.user = user;
            this.hasPicture = hasPicture;
        }
    }

    public class VersionQuery
    {
        public int? version { get; set; }
    }
}
