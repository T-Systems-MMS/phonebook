using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models.Old
{
    public class Business
    {
        private readonly OrgUnit orgUnit;
        private readonly IEnumerable<OrgUnit> orgUnitStructur;
        private readonly Models.Person owner;

        public Business(Models.OrgUnit orgUnit, bool forOwners = false)
        {
            this.orgUnit = orgUnit;
            var currentOrgUnit = orgUnit;
            var orgUnitStructur = new List<OrgUnit>();
            orgUnitStructur.Add(orgUnit);
            while (currentOrgUnit.Parent != null)
            {
                orgUnitStructur.Add(currentOrgUnit.Parent);
                currentOrgUnit = currentOrgUnit.Parent;
            }
            orgUnitStructur.Reverse();
            this.orgUnitStructur = orgUnitStructur;
            if (forOwners)
            {
                var changeOwner = orgUnitStructur.Last();
                changeOwner.HeadOfOrgUnit = new Models.Person();

            }
        }
        public IEnumerable<string> ShortBusinessunitTeamassistent { get { return orgUnit.OrgUnitToFunctions.Where(d => d.RoleName == "TA").Select(d => d.Person.ShortName); } }
        public IEnumerable<string> ShortSupervisor { get { return orgUnitStructur.Where(d => d.Id != 110).Select(d => d.HeadOfOrgUnit.ShortName); } }
        public IEnumerable<string> ShortOrgUnit { get { return orgUnitStructur.Where(d => d.Id != 110).Select(d => d.ShortName); } }
        public IEnumerable<string> OrgUnit { get { return orgUnitStructur.Where(d => d.Id != 110).Select(d => d.Name); } }
        public IEnumerable<string> BusinessunitTeamassistent { get { return orgUnit.OrgUnitToFunctions.Where(d => d.RoleName == "TA").Select(d => $"{d.Person.FirstName} {d.Person.LastName}"); } }
        public IEnumerable<string> Supervisor { get { return orgUnitStructur.Where(d => d.Id != 110).Select(d => $"{d.HeadOfOrgUnit.FirstName} {d.HeadOfOrgUnit.LastName}"); } }
        public string Costcenter { get { return orgUnit.CostCenter; } }
    }
}
