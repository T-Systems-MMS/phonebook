using NetEscapades.Configuration.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Backend.PictureService.Configuration
{
    public class ContactInformation : IValidatable
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        public void Validate()
        {
            Validator.ValidateObject(this, new ValidationContext(this), validateAllProperties: true);
        }
    }
}
