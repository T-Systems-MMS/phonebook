using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace Phonebook.Backend.Login
{
    [Authorize]
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            // TODO: read the asp.net cookie experation date to set this cookie more valid
            // Important: Never set an expiration date here. The real authentication cookie also has no expiration date, so the browser delete it after closing.
            HttpContext.Response.Cookies.Append("LoginValidTo", $"{DateTimeOffset.UtcNow.AddHours(1).ToString("s")}Z");
            // Redirect to the app root
            return Redirect("/");
        }
    }
}
