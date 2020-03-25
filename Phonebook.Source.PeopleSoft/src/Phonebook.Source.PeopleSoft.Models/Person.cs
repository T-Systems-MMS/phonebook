using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Phonebook.Source.PeopleSoft.Models
{
    public class Person
    {
        [Column(name:"ID")]
        public int Id { get; set; }
        [Column(name: "KUERZEL")]
        public string? ShortName { get; set; }
        [Column(name: "VORNAME")]
        public string? FirstName { get; set; }
        [Column(name: "NAME")]
        public string? LastName { get; set; }
        [Column(name: "TITEL")]
        public string? Title { get; set; }
        [Column(name: "TELEFON")]
        public string? Phone { get; set; }
        [Column(name: "MOBIL")]
        public string? MobilPhone { get; set; }
        [Column(name:"FAX")]
        public string? FAX { get; set; }
        [Column(name: "EMAIL")]
        public string? EMail { get; set; }
        [Column(name: "MITARBEITER_STATUS_ID")]
        public int StatusId { get; set; }
        public virtual Status? Status { get; set; }
        [Column(name: "ORGEINHEIT_ID")]
        public int OrgUnitId { get; set; }
        public virtual OrgUnit OrgUnit { get; set; } = new OrgUnit();
        [Column(name: "FUNKTION_ID")]
        public int? FunctionId { get; set; }
        public virtual Function? Function { get; set; }
        [Column(name: "RAUM_ID")]
        public int? RoomId { get; set; }
        public virtual Room Room { get; set; } = new Room();

        
        public virtual IEnumerable<OrgUnit>? OwnedOrgUnits { get; set; }
        
        public virtual IEnumerable<OrgUnitToFunction>? OrgUnitFunctions { get; set; }
    }
}
