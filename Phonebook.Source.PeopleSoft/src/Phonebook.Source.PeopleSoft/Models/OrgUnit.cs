using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models
{
    public class OrgUnit
    {
        [Column(name: "ID")]
        public int Id { get; set; }
        [Column(name: "BEZEICHNUNG")]
        public string Name { get; set; }
        [Column(name: "KURZBEZEICHNUNG")]
        public string ShortName { get; set; }
        [Column(name:"VATER")]
        public int ParentId { get; set; }
        // Currently not working
        // public OrgUnit Parent { get; set; }
        [Column(name:"KST")]
        public string CostCenter { get; set; }
        // Currently not working
        // public IEnumerable<Person> Members { get; set; }
    }
}
