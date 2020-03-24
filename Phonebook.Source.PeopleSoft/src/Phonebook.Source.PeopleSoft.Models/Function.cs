using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Phonebook.Source.PeopleSoft.Models
{
    public class Function
    {
        [Column(name: "ID")]
        public int Id { get; set; }
        [Column(name: "CODE")]
        public string Code { get; set; }
        [Column(name: "BEZEICHNUNG")]
        public string Label { get; set; }
        public virtual IEnumerable<Person> Peoples { get; set; }        
        public virtual IEnumerable<OrgUnitToFunction> OrgUnitToFunctions { get; set; }
    }
}