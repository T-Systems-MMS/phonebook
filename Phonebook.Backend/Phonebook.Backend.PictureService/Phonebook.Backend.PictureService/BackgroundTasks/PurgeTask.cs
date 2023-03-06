using KK.AspNetCore.BackgroundTasks.Scheduled;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Phonebook.Backend.PictureService.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace Phonebook.Backend.PictureService.Controllers
{
    public class PurgeTask : IScheduledTask
    {

        private readonly ILogger<PurgeTask> logger;
        private readonly PictureServiceConfiguration configuration;

        public PurgeTask(
            IScheduledTaskOptions<PurgeTask> options,
            ILogger<PurgeTask> logger,
            PictureServiceConfiguration configuration
            )
        {
            this.Options = options;
            this.logger = logger;
            this.configuration = configuration;
        }

        public IScheduledTaskOptions<IScheduledTask> Options { get; }

        public async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                var people = await GetPeople();
                var files = Directory.GetFiles(Path.Combine(
                       Directory.GetCurrentDirectory(), "images"));

                DeleteFilesOfNonMembers(files, people);
            }
            // Todo: check a more explicit error
            catch (Exception err)
            {
                this.logger.LogError("ERROR: Purging images failed (might be a failed Request, maybe you should check the SSL Certificate)");
            }

        }
        /// <summary>
        /// Delete all files of non existing members
        /// </summary>
        /// <param name="files">all files that exist</param>
        /// <param name="persons">all person that are members</param>
        private void DeleteFilesOfNonMembers(string[] files, Person[] persons)
        {
            foreach (string file in files)
            {
                string fileName = Path.GetFileNameWithoutExtension(file);
                IEnumerable<Person> matches = persons.Where(p =>
                {
                    return p.id.ToLower() == fileName.ToLower();
                });

                if (matches.Count() == 0)
                {
                    try
                    {
                        File.Delete(file);
                    }
                    catch (Exception err)
                    {
                        this.logger.LogError("ERROR: Purging images failed (could not delete file)");
                    };
                }
            };
            this.logger.LogInformation("Purged all images from users not in database.");
        }
        /// <summary>
        /// Try Get People from the PersonBackendUrl
        /// </summary>
        /// <returns>Get all people that are members</returns>
        private async Task<Person[]> GetPeople()
        {
            HttpClientHandler clientHandler = new HttpClientHandler();
            // Ignore SSL Certificate Validity
            if (this.configuration.IgnoreSSLValidity)
            {
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            }
            // The 'using' will help to prevent memory leaks.
            // Create a new instance of HttpClient
            using (HttpClient client = new HttpClient(clientHandler))
            {
                client.Timeout = TimeSpan.FromSeconds(10);
                //Setting up the response...         
                using (HttpResponseMessage res = await client.GetAsync(this.configuration.PersonBackendUrl))
                {
                    if (!res.IsSuccessStatusCode)
                    {
                        this.logger.LogError("ERROR: Purging images failed: API request failed");
                    }

                    using (HttpContent content = res.Content)
                    {
                        string data = await content.ReadAsStringAsync();
                        if (data == null)
                        {
                            this.logger.LogError("ERROR: Purging images failed: No Users in API Response");
                        }
                        Person[] persons = JsonConvert.DeserializeObject<Person[]>(data);
                        if (persons.Length == 0)
                        {
                            this.logger.LogError("ERROR: Purging images failed (Malformated response)");
                        }
                        return persons;
                    }
                }
            }
        }
    }
}

class Person
{
    public string id;
}