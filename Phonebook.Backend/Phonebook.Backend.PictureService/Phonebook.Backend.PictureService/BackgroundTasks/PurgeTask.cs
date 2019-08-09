using KK.AspNetCore.BackgroundTasks.Scheduled;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
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

        public PurgeTask(
            IScheduledTaskOptions<PurgeTask> options,
            ILogger<PurgeTask> logger
            )
        {
            this.Options = options;
            this.logger = logger;
        }

        public IScheduledTaskOptions<IScheduledTask> Options { get; }

        public async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            // TODO: Add this to appsettings.json
            string baseUrl = "https://demo-phonebook.me/api/persons";
            //The 'using' will help to prevent memory leaks.
            //Create a new instance of HttpClient
            using (HttpClient client = new HttpClient())

            //Setting up the response...         

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
                        this.logger.LogError("ERROR: Purging images failed");
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
                                this.logger.LogError("ERROR: Purging images failed");
                            };
                        }

                    };
                    this.logger.LogInformation("Purged all images from users not in database.");
                }
            }

        }
    }
}

class Person
{
    public string id;
}