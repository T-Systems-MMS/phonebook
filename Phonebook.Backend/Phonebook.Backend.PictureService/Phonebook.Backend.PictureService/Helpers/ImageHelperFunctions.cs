using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Phonebook.Backend.PictureService.Helpers
{
    /// <summary>
    /// Contains functions to help with accessing and manage the images of the phonebook.
    /// </summary>
    public static class ImageHelperFunctions
    {
        /// <summary>
        /// The default storage for the original images.
        /// </summary>        
        private static string originalImagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "images");

        /// <summary>
        /// Get all original images of the user from the storage.
        /// </summary>
        /// <param name="userId">The user id. That is not the database id. It is more a unique shortname of a user.</param>
        private static Func<string, IEnumerable<string>> allOriginalUserImages = (userId) => Directory.EnumerateFiles(originalImagesFolder, userId + ".*");

        /// <summary>
        /// The folder for the generated images per user.
        /// </summary>        
        /// <param name="userId">The user id. That is not the database id. It is more a unique shortname of a user.</param>
        private static Func<string, string> generatedImagesFolder = (userId) => Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "generated", userId);



        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId">The user id. That is not the database id. It is more a unique shortname of a user.</param>
        /// <exception cref="Exception">Why it's thrown.</exception>
        /// <exception cref="ArgumentException">If the user hasn't pictures uploaded yet you get an error.</exception>
        /// <returns></returns>
        public static HttpStatusCode DeleteFilesForUser(string userId)
        {

            if(DoesFileExist(userId) == false){
                throw new ArgumentException($"The user {userId} doesn't has a picture. Please check first if a user has pictures!");
            }

            var generatedPath = generatedImagesFolder(userId);
            try
            {
                // Delete the generated Images Folder
                if (Directory.Exists(generatedPath))
                {
                    Directory.Delete(generatedPath, true);
                };  

                // Delete the uploaded file, ignoring the file ending
                var files = allOriginalUserImages(userId);
                if (files.Count() == 0)
                {                    
                    return HttpStatusCode.NoContent;
                }

                foreach (string file in files)
                {
                    File.Delete(file);
                };

                return HttpStatusCode.NoContent;
            }
            catch (Exception err)
            {
                throw err;
            };
        }
        /// <summary>
        /// Check if a picture exits in the storage.
        /// </summary>
        /// <param name="userId">The user id. That is not the database id. It is more a unique shortname of a user.</param>
        /// <returns>True if the file exists.</returns>
        public static Boolean DoesFileExist(string userId)
        {
            var uploadPath = Path.Combine(
                            Directory.GetCurrentDirectory(), "images");
            var files = allOriginalUserImages(userId);
            try
            {
                // File does not exist
                if (files.Count() == 1)
                {
                    return true;
                }
                return false;
            }
            catch (Exception err)
            {
                return false;
            };
        }
    }
}
