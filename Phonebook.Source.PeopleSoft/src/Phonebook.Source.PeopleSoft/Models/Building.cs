using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models
{
    public class Building
    {
        [Column(name: "G_ID")]
        public int Id { get; set; }
        [Column(name: "S_ID")]
        public int LocationId { get; set; }        
        public virtual Location Location { get; set; }
        [Column(name: "KURZBEZEICHNUNG")]
        public string ShortName { get; set; }
        [Column(name: "NAME_LANG")]
        public string Address { get; set; }
        [Column(name:"NAME")]
        public string Name { get; set; }        
        public virtual IEnumerable<Floor> Floors { get; set; }        
        public virtual IEnumerable<BuildingPart> BuildingParts { get; set; }
    }
}
