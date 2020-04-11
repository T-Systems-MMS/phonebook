using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Phonebook.Source.PeopleSoft
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var builder = CreateWebHostBuilder(args).Build();
            if(builder.ServerFeatures.Count() > 0)
            {
                // Here we are know we are not in an IIS
                throw new ApplicationException("This web app must run in an IIS. You are currently not running in a IIS.");
            }
            builder.Run();
        }

        public static IHostBuilder CreateWebHostBuilder(string[] args) =>
             Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
