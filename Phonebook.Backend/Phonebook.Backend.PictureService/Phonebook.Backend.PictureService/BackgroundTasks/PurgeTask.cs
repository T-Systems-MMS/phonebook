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
            string baseUrl = this.configuration.PersonBackendUrl;

            HttpClientHandler clientHandler = new HttpClientHandler();
            // Ignore SSL Certificate Validity
            if (this.configuration.IgnoreSSLValidity)
            {
                clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };
            }

            //The 'using' will help to prevent memory leaks.
            //Create a new instance of HttpClient
            using (HttpClient client = new HttpClient(clientHandler))
            {

                client.Timeout = TimeSpan.FromSeconds(10);
                //Setting up the response...         

                try
                {
                    using (HttpResponseMessage res = await client.GetAsync(baseUrl))
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

                            String[] files = Directory.GetFiles(Path.Combine(
                                    Directory.GetCurrentDirectory(), "images"));


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
                                        System.IO.File.Delete(file);
                                    }
                                    catch (Exception err)
                                    {
                                        this.logger.LogError("ERROR: Purging images failed (could not delete file)");
                                    };
                                }
                            };
                            this.logger.LogInformation("Purged all images from users not in database.");
                        }
                    }
                }
                catch (Exception err)
                {
                    this.logger.LogError("ERROR: Purging images failed (might be a failed Request, maybe you should check the SSL Certificate)");
                }
            }

        }
    }
}

class Person
{
    public string id;
}