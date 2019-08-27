using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models
{
    public class Room
    {
        [Column(name:"R_ID")]
        public int Id { get; set; }
        [Column(name: "NUMMER")]
        public string Number { get; set; }
        [Column(name: "E_ID")]
        public int? FloorId { get; set; }
        [Column(name: "GT_ID")]
        public int? BuildingPartId { get; set; }        
        public virtual BuildingPart BuildingPart { get; set; }
        [Column(name: "RAUMPLAN")]
        public string Map { get; set; }        
        public virtual IEnumerable<Person> Members { get; set; }
    }
}
