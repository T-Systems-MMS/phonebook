using Microsoft.EntityFrameworkCore;
using Phonebook.Source.PeopleSoft.Models;
using Phonebook.Source.PeopleSoft.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Repositories
{
    public class OrgUnitRepository: IRepository<OrgUnit>
    {
        private readonly ModelContext context;

        public OrgUnitRepository(ModelContext context)
        {
            this.context = context;
        }

        public IEnumerable<OrgUnit> Get()
        {
            var orgUnits = this.inlcudeDependencies(context.OrgUnits).ToList();
            return orgUnits.Select(o => GetCleanedOrgUnit(o, orgUnits)).Where(d => d.ParentId == null);
                //.Select(d => GetCleanedOrgUnit(d));
        }

        public OrgUnit Get(int id)
        {
            var orgunit = this.inlcudeDependencies(context.OrgUnits).Single(d => d.Id == id);
            //return orgunit;
            return GetCleanedOrgUnit(orgunit, this.inlcudeDependencies(context.OrgUnits).ToList());
        }

        private OrgUnit GetCleanedOrgUnit(OrgUnit orgUnit, IEnumerable<OrgUnit> all)
        {
            //orgUnit.Members = orgUnit.Members.Select(d => GetCleanedPerson(d));
            orgUnit.HeadOfOrgUnit = orgUnit.HeadOfOrgUnit == null ? null : GetCleanedPerson(orgUnit.HeadOfOrgUnit);
            orgUnit.OrgUnitToFunctions = orgUnit.OrgUnitToFunctions == null ? new List<OrgUnitToFunction>():
                orgUnit.OrgUnitToFunctions.Select(f =>
                {
                    f.OrgUnit = null;
                    f.Person = GetCleanedPerson(f.Person);
                    return f;
                });       
            orgUnit.ChildOrgUnits = all.Where(d => d.ParentId == orgUnit.Id).Select(o => GetCleanedOrgUnit(o, all));            
            orgUnit.Parent = null;
            return orgUnit;
        }

        private Person GetCleanedPerson(Person person)
        {
            person.OwnedOrgUnits = null;
            person.OrgUnit = null;
            person.OrgUnitFunctions = null;
            return person;
        }

        private ICollection<OrgUnit> inlcudeDependencies(IQueryable<OrgUnit> query)
        {
            return query
                    .AsNoTracking()
                    .Include(o => o.ChildOrgUnits)
                        .ThenInclude(o => o.OrgUnitToFunctions)
                            .ThenInclude(o => o.Person)
                    .Include(o => o.ChildOrgUnits)
                        .ThenInclude(o => o.HeadOfOrgUnit)
                    .Include(o => o.ChildOrgUnits)
                        .ThenInclude(o => o.ChildOrgUnits)
                            .ThenInclude(o => o.ChildOrgUnits)
                                .ThenInclude(o => o.ChildOrgUnits)
                    .Include(o => o.OrgUnitToFunctions)
                        .ThenInclude(o => o.Person)
                    .Include(o => o.HeadOfOrgUnit)
                    .ToList() // We need this always. If you remove this line you don't get the tree of the orgunit...
                    ;

        }
    }
}
