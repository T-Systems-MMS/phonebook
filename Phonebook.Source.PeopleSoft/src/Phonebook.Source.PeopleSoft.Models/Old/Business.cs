using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models.Old {
    public class Business {
        private readonly OrgUnit orgUnit;
        private readonly IEnumerable<OrgUnit> orgUnitStructur;

        public Business (Models.OrgUnit orgUnit, bool forOwners = false) {
            this.orgUnit = orgUnit;
            var currentOrgUnit = orgUnit;
            var orgUnitStructur = new List<OrgUnit> ();
            orgUnitStructur.Add (orgUnit);
            do {
                orgUnitStructur.Add (currentOrgUnit.Parent);
                currentOrgUnit = currentOrgUnit.Parent;
            } while (currentOrgUnit != null && currentOrgUnit.Parent != null);
            orgUnitStructur.Reverse ();
            this.orgUnitStructur = orgUnitStructur;
            if (forOwners) {
                var newHeadOf = orgUnitStructur.ElementAt (orgUnitStructur.Count - 2).HeadOfOrgUnit;
                var changeOwner = orgUnitStructur.Last ();
                changeOwner.HeadOfOrgUnit = newHeadOf;
                changeOwner.HeadOfOrgUnitId = newHeadOf?.Id;
            }
        }
        public int Id { get { return orgUnit.Id; } }
        public IEnumerable<string?> ? ShortBusinessunitTeamassistent { get { return orgUnit?.OrgUnitToFunctions?.Where (d => d.RoleName == "TA")?.Select (d => d?.Person?.ShortName); } }
        public IEnumerable<string?> ? ShortSupervisor { get { yield return orgUnitStructur?.Where (d => !string.IsNullOrWhiteSpace (d?.HeadOfOrgUnit?.ShortName)).Select (d => d?.HeadOfOrgUnit?.ShortName).LastOrDefault (); } }
        public IEnumerable<string?> ? ShortOrgUnit { get { return orgUnitStructur?.Where (d => d?.HeadOfOrgUnit != null).Select (d => d?.ShortName); } }
        public IEnumerable<string?> ? OrgUnit { get { return orgUnitStructur?.Where (d => d?.HeadOfOrgUnit != null).Select (d => d?.Name); } }
        public IEnumerable<string> BusinessunitTeamassistent { get { return orgUnit.OrgUnitToFunctions.Where (d => d.RoleName == "TA").Select (d => $"{d.Person.FirstName} {d.Person.LastName}"); } }
        public IEnumerable<string> Supervisor { get { yield return orgUnitStructur.Where (d => string.IsNullOrWhiteSpace (d?.HeadOfOrgUnit?.FirstName) == false && string.IsNullOrWhiteSpace (d?.HeadOfOrgUnit?.LastName) == false).Select (d => $"{d?.HeadOfOrgUnit?.FirstName} {d?.HeadOfOrgUnit?.LastName}").LastOrDefault (); } }
        public string? Costcenter { get { return orgUnit?.CostCenter; } }
    }
}
