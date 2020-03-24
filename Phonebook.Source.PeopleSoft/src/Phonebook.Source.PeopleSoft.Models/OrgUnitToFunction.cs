using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models
{
    public class OrgUnitToFunction
    {
        //public int Id { get; set; }
        [Column(name: "PERSON_ID")]
        public int PersonId { get; set; }
        public virtual Person Person { get; set; }
        [Column(name: "ORG_EINHEIT_ID")]
        public int OrgUnitId { get; set; }
        public virtual OrgUnit OrgUnit { get; set; }
        [Column(name: "FUNKTIONSROLLE_ID")]
        public int FunctionId { get; set; }
        public virtual Function Function { get; set; }
        [Column(name: "SPRECHENDER_NAME")]
        public string RoleName { get; set; }
    }
}
