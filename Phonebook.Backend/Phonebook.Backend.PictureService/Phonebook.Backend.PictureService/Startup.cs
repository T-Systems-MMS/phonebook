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
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.Extensions.PlatformAbstractions;
using System.Reflection;

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
            services.AddSingleton<PictureServiceConfiguration>(AppSettings);
            services.UseConfigurationValidation();
            services.ConfigureValidatableSetting<PictureServiceConfiguration>(Configuration);
            services.ConfigureValidatableSetting<ContactInformation>(Configuration.GetSection("ContactInformation"));
            services.AddSingleton<PictureServiceConfiguration>(AppSettings);

            // Add Api Versioning Logic
            services.AddApiVersioning(o =>
            {
                o.ReportApiVersions = true;
                o.AssumeDefaultVersionWhenUnspecified = true;
                o.DefaultApiVersion = new ApiVersion(1, 0);

            });

            services.AddVersionedApiExplorer(options =>
            {
                // add the versioned api explorer, which also adds IApiVersionDescriptionProvider service
                // note: the specified format code will format the version as "'v'major[.minor][-status]"
                options.GroupNameFormat = "'v'VVV";
                // note: this option is only necessary when versioning by url segment. the SubstitutionFormat
                // can also be used to control the format of the API version in route templates
                options.SubstituteApiVersionInUrl = true;
            });

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
                    Schedule = AppSettings.PurgeSchedule
                }
            );
            services.AddScheduledTask<PurgeTask>();
            services.AddHostedService<SchedulerHostedService>();


            // Add Swagger 
            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
            services.AddSwaggerGen(c =>
            {
                // add a custom operation filter which sets default values
                c.OperationFilter<SwaggerDefaultValues>();
                

                c.IncludeXmlComments(XmlCommentsFilePath);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApiVersionDescriptionProvider provider)
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
                foreach (var description in provider.ApiVersionDescriptions)
                {
                    c.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
                }
            });

            // Image Processing Stuff
            app.UseImageProcessing();
            app.UseStaticFiles();

            app.UseHttpsRedirection();
            app.UseMvc();
        }

        static string XmlCommentsFilePath
        {
            get
            {
                var basePath = PlatformServices.Default.Application.ApplicationBasePath;
                var fileName = typeof(Startup).GetTypeInfo().Assembly.GetName().Name + ".xml";
                return Path.Combine(basePath, fileName);
            }
        }
    }
}
