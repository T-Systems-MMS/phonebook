using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Phonebook.Source.PeopleSoft
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var builder = CreateWebHostBuilder(args).Build();
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
