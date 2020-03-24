using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Phonebook.Source.PeopleSoft.Models
{
    public class Floor
    {
        [Column(name: "ID")]
        public int Id { get; set; }
        [Column(name: "NUMMER")]
        public int Number { get; set; }
        [Column(name: "BESCHREIBUNG")]
        public string? Description { get; set; }
        [Column(name: "GEBAEUDE_ID")]
        public int BuildingId { get; set; }        
        public virtual Building Building { get; set; }

        public virtual IEnumerable<Room> Rooms { get; set; }
        
    }
}
