using System.ComponentModel.DataAnnotations;
using NetEscapades.Configuration.Validation;

namespace Phonebook.Backend.PictureService.Configuration
{

    /// <summary>
    /// The application configuration model that contains all configuration options of the application.
    /// </summary>
    public class PictureServiceConfiguration : IValidatable
    {
        /// <summary>
        /// Gets or sets the configuration for the CORS Allowed Hosts.
        /// </summary>
        public string[] AllowedCORSDomains { get; set; } = { };

        /// <summary>
        /// The Schedule in which Pictures will get deleted if no user could be found. 
        /// </summary>
        /// <value>Default: Once every day at startup -> May be executed multiple times a day depending on recycling</value>
        public string PurgeSchedule { get; set; } = "0 0 * * *";
        /// <summary>
        /// The Url to the Person Endpoint of the Phonebook
        /// Required in order to delete pictures of users who are not listed anymore.
        /// </summary>
        [Required]
        [Url]
        public string PersonBackendUrl { get; set; }

        /// <summary>
        /// Ignore the validity of the SSL Certificate for the Person Endpoint
        /// </summary>
        public bool IgnoreSSLValidity { get; set; } = false;

        /// <summary>
        /// Contact Information displayed in the swagger API description.
        /// </summary>
        [Required]
        public ContactInformation ContactInformation { get; set; }

        public void Validate()
        {
            Validator.ValidateObject(this, new ValidationContext(this), validateAllProperties: true);
        }
    }
}