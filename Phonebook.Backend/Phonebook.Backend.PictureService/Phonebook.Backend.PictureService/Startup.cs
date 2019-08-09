using System;
using System.IO;
using KK.AspNetCore.BackgroundTasks.Scheduled;
using KK.AspNetCore.Images.Processing;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Phonebook.Backend.PictureService.Controllers;
using Swashbuckle.AspNetCore.Swagger;

namespace Phonebook.Backend.PictureService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Enable IIS Integration            
            services.AddAuthentication(IISDefaults.AuthenticationScheme);
            services.Configure<IISOptions>(options =>
            {
                options.AutomaticAuthentication = true;
            });
            services.AddCors(o => o.AddPolicy("AllowDomainList", builder =>
            {
                // Add some CORS allowed origins here
                // TODO: Refactor in appsettings.json
                builder.WithOrigins("https://example.com", "https://localhost:8080", "http://localhost:4200", "https://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
            }));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddImageProcessingSettings(Configuration);

            // Scheduled Tasks
            services.AddSingleton<IScheduledTaskOptions<PurgeTask>>(
                new ScheduledTaskOptions<PurgeTask>
                {
                    // Once every day at startup -> May be exectuted multiple times a day depending on recycling
                    Schedule = "0 0 * * *",
                }
            );
            services.AddScheduledTask<PurgeTask>();
            services.AddHostedService<SchedulerHostedService>();


            // Add Swagger 
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Picture Service API",
                    Description = "API for management of Phonebook Pictures",
                    TermsOfService = "None",
                    // TODO: Put these settings into the appsettings.json
                    Contact = new Contact() { Name = "Phonebook Team", Email = "contact Address"}
                });
                var basePath = AppContext.BaseDirectory;
                var assemblyName = System.Reflection.Assembly.GetEntryAssembly().GetName().Name;
                var fileName = System.IO.Path.GetFileName(assemblyName + ".xml");
                c.IncludeXmlComments(System.IO.Path.Combine(basePath, fileName));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // Should stay on Top
            app.UseCors("AllowDomainList");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseAuthentication();


            // Show all Pictures in wwwroot
            app.UseDirectoryBrowser(new DirectoryBrowserOptions
            {
                FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
                RequestPath = ""
            });

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Picture Service API V1");
            });

            // Image Processing Stuff
            app.UseImageProcessing();
            app.UseStaticFiles();

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
