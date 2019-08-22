using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Phonebook.Backend.PictureService.Helpers;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace Phonebook.Backend.PictureService.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Authorize]
    [EnableCors("AllowDomainList")]
    [Route("/")]
    [ApiVersion("2.0")]
    [ApiVersion("1.0")]
    [ApiController]
    public class EmployeePictureController : ControllerBase
    {
        private static readonly string[] validContentTypes = new string[]
            {
                // BMP
                "image/bmp",
                "image/x-ms-bmp",
                "image/x-bmp",
                // SVG
                "image/svg+xml",
                // WebP
                "image/webp",
                // GIF
                "image/gif",
                // JPEG 2000
                "image/jp2",
                "image/jpx",
                "image/jpm",
                // JPEG
                "image/jpeg",
                // PNG
                "image/png",
                // PSD
                "image/vnd.adobe.photoshop",
                "application/x-photoshop",
                "application/photoshop",
                "application/psd",
                "image/psd",
                // SGI
                "image/sgi",
                // TGA
                "image/x-targa",
                "image/x-tga",
                // TIFF
                "image/tiff",
                "image/tiff-fx"
            };

        private readonly ILogger<EmployeePictureController> logger;

        public EmployeePictureController(ILogger<EmployeePictureController> logger)
        {
            this.logger = logger;
        }
        /// <summary>
        /// Upload an employee picture.
        /// </summary>
        /// <remarks>Content has to be formatted as "image/jpeg"</remarks>
        /// See <see cref="UserController.WhoAmI()"/> to get the currently logged in user.
        /// <param name="id">The id of the user.</param>
        /// <param name="file">A "multipart"</param>
        /// <returns>
        /// A status code indicating the success of the action.
        /// </returns>
        /// <permission cref="System.Security.PermissionSet">Everyone can access this method.</permission>
        /// <response code="200">Ok</response>
        /// <response code="400">No Payload</response>
        /// <response code="400">Content malformated</response>
        /// <response code="401">User not authorized</response>
        /// <response code="500">Internal Server Error</response>
        [HttpPost("{id}")]
        [RequestSizeLimit(2147483648)]
        public async Task<IActionResult> UploadPicture(string id, IFormFile file)
        {
            if(file == null || file.Length == 0)
            {
                return BadRequest("No Payload.");
            }
            var user = HttpContext.User;
            if(user.Identity.Name.Split("\\")[1] != id)
            {
                return StatusCode(401, "User not authorized.");
            }
            if(IsAValidContentType(file.ContentType))
            {
                try
                {
                    // Delete old File before writing the new one.
                    HelpersThing.DeleteFilesForUser(id);

                    var path = Path.Combine(
                                Directory.GetCurrentDirectory(), "images",
                                id + Path.GetExtension(file.FileName));
                    if(!Directory.Exists(Path.GetDirectoryName(path)))
                    {
                        Directory.CreateDirectory(Path.GetDirectoryName(path));
                    }
                    using(var stream = new FileStream(path, FileMode.OpenOrCreate))
                    {
                        await file.CopyToAsync(stream);
                    }

                }
                catch(Exception err)
                {
                    this.logger.LogError(err, err.Message);
                    return StatusCode(500, "Internal Server Error");
                };

                return Ok();
            }
            else
            {
                // TODO: that is wrong! Maybe we should send a a list of supported mime types.
                var AcceptableContentTypes = String.Join(",", validContentTypes);
                return BadRequest($"Content malformated. Server does only accept {AcceptableContentTypes}");
            }
        }

        /// <summary>
        /// Delete a picture associated with a user id. 
        /// </summary>
        /// <param name="id">The id of the user</param>
        /// <returns>A status code indicating the success of the action.</returns>
        /// <response code="200">Ok</response>
        /// <response code="204">Ok, file not found</response>
        /// <response code="401">User not authorized</response>
        /// <response code="500">Internal Server Error</response>
        [HttpDelete("{id}")]
        public IActionResult DeletePicture(string id)
        {
            var user = HttpContext.User;
            if(user.Identity.Name.Split("\\")[1] != id)
            {
                return StatusCode(401, "User not authorized.");
            }
            try
            {
                return StatusCode(HelpersThing.DeleteFilesForUser(id));
            }
            catch(Exception err)
            {
                this.logger.LogError(err, err.Message);
                return StatusCode(500, "Internal Server Error");
            }
        }
        private bool IsAValidContentType(string ContentType)
        {
            return validContentTypes.Any(d => d == ContentType);
        }
    }
}
