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
using Phonebook.Backend.PictureService.Configuration;
using Phonebook.Backend.PictureService.Controllers;
using Swashbuckle.AspNetCore.Swagger;
using System.ComponentModel.DataAnnotations;

namespace Phonebook.Backend.PictureService
{
    /// <summary>
    /// Startup Class
    /// </summary>
    public class Startup
    {
        private IConfiguration Configuration { get; }
        private PictureServiceConfiguration AppSettings { get; }
        private const string CorsPolicy = "AllowDomainList";
        /// <summary>
        /// Initializes a new instance of the <see cref="Startup"/> class.
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
            this.AppSettings = configuration.Get<PictureServiceConfiguration>();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Validation of the appsettings on Startup
            services.UseConfigurationValidation();
            services.ConfigureValidatableSetting<PictureServiceConfiguration>(Configuration);
            services.ConfigureValidatableSetting<ContactInformation>(Configuration.GetSection("ContactInformation"));
            services.AddSingleton<PictureServiceConfiguration>(AppSettings);

            //Enable IIS Integration            
            services.AddAuthentication(IISDefaults.AuthenticationScheme);
            services.Configure<IISOptions>(options =>
            {
                options.AutomaticAuthentication = true;
            });
            services.AddCors(o => o.AddPolicy(CorsPolicy, builder =>
            {
                // Add some CORS allowed origins here
                builder.WithOrigins(this.AppSettings.AllowedCORSDomains).AllowAnyMethod().AllowAnyHeader().AllowCredentials();
            }));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);



            services.AddImageProcessingSettings(Configuration);

            // Scheduled Tasks
            services.AddSingleton<IScheduledTaskOptions<PurgeTask>>(
                new ScheduledTaskOptions<PurgeTask>
                {
                    // Once every day at startup -> May be exectuted multiple times a day depending on recycling
                    Schedule = AppSettings.PurgeSchedule,
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
                    Contact = new Swashbuckle.AspNetCore.Swagger.Contact() { Name = AppSettings.ContactInformation.Name, Email = AppSettings.ContactInformation.Email }
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
            app.UseCors(CorsPolicy);
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
