using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Backend.PictureService.Models
{
    public class Identity
    {
        public string user { get; set; }
        public bool hasPicture { get; set; }
        public Identity(string user, bool hasPicture)
        {
            this.user = user;
            this.hasPicture = hasPicture;
        }
    }
}