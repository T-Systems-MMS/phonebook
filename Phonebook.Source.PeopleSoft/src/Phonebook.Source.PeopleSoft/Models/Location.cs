using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models
{
    public class Location
    {
        [Column(name:"S_ID")]
        public int Id { get; set; }
        [Column(name: "LAND")]
        public string Country { get; set; }
        [Column(name: "NAME")]
        public string Name { get; set; }
        [Column(name: "KURZBEZEICHNUNG")]
        public string ShortName { get; set; }
        // Currently not working
        // public IEnumerable<Building> Buildings { get; set; }
    }
}
