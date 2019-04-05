using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models
{
    public class Floor
    {
        [Column(name: "E_ID")]
        public int Id { get; set; }
        [Column(name: "BESCHREIBUNG")]
        public string Describtion { get; set; }
        [Column(name: "G_ID")]
        public int BuildingId { get; set; }
        // Currently not working
        // public Building Building { get; set; }
    }
}
