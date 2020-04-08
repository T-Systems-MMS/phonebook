﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Phonebook.Source.PeopleSoft.Models
{
    public class OrgUnit
    {
        [Column(name: "ID")]
        public int Id { get; set; }
        [Column(name: "BEZEICHNUNG")]
        public string? Name { get; set; }
        [Column(name: "KURZBEZEICHNUNG")]
        public string? ShortName { get; set; }
        [Column(name:"VATER")]
        public int? ParentId { get; set; }        
        public virtual OrgUnit? Parent { get; set; }
        [Column(name: "LEITER_ORG_EINHEIT")]
        public int? HeadOfOrgUnitId { get; set; }
        
        public virtual Person? HeadOfOrgUnit { get; set; }
        [Column(name:"KST")]
        public string? CostCenter { get; set; }

        public virtual IEnumerable<Person>? Members { get; set; }

        public virtual IEnumerable<OrgUnitToFunction>? OrgUnitToFunctions { get; set; }
    }
}
