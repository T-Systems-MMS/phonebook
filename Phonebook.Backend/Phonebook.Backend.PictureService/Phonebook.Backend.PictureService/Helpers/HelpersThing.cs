using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Phonebook.Backend.PictureService.Helpers
{
    public class HelpersThing
    {
        /// <exception cref="Exception">Why it's thrown.</exception>
        public static int DeleteFilesForUser(string id)
        {

            var generatedPath = Path.Combine(
                            Directory.GetCurrentDirectory(), "wwwroot", "generated", id);

            var uploadPath = Path.Combine(
                            Directory.GetCurrentDirectory(), "images");

            try
            {
                // Delete the generated Images Folder
                if (System.IO.Directory.Exists(generatedPath))
                {
                    System.IO.Directory.Delete(generatedPath, true);
                };

                // Delete the uploaded file, ignoring the file ending
                IEnumerable<string> files = Directory.EnumerateFiles(uploadPath, id + ".*");
                if (files.Count() == 0)
                {
                    return 204;
                }

                foreach (string file in files)
                {
                    System.IO.File.Delete(file);
                };

                return 200;
            }
            catch (Exception err)
            {
                throw err;
            };
        }

        public static Boolean DoesFileExist(string id)
        {
            var uploadPath = Path.Combine(
                            Directory.GetCurrentDirectory(), "images");

            IEnumerable<string> files = Directory.EnumerateFiles(uploadPath, id + ".*");

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
