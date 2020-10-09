using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Phonebook.Source.PeopleSoft.Models;
using Phonebook.Source.PeopleSoft.Models.Context;

namespace Phonebook.Source.PeopleSoft.Repositories {
    public class OrgUnitRepository : IRepository<OrgUnit> {
        private readonly ModelContext context;
        private IMemoryCache cache;

        public OrgUnitRepository (ModelContext context, IMemoryCache cache) {
            this.context = context;
            this.cache = cache;
        }

        public async Task<IEnumerable<OrgUnit>> Get () {
            if (this.cache.TryGetValue (this.GetType().Name, out IEnumerable<OrgUnit> cachedOrgUnits)) {
                return cachedOrgUnits;
            }
            var orgUnits = (await this.includeDependenciesAsync (context.OrgUnits)).Where (o => o.ParentId == null);
            orgUnits = orgUnits.Select (o => GetCleanedOrgUnit (o));
            this.cache.Set (this.GetType().Name, orgUnits);
            return orgUnits;
        }

        public async Task<OrgUnit> Get (int id) {
            if (this.cache.TryGetValue($"{this.GetType().Name}/{id}", out OrgUnit cachedOrgUnit))
            {
                return cachedOrgUnit;
            }
            var orgunit = (await this.includeDependenciesAsync (context.OrgUnits)).Single (d => d.Id == id);
            orgunit = GetCleanedOrgUnit(orgunit);
            this.cache.Set($"{this.GetType().Name}/{id}", orgunit);            
            return orgunit;
        }

        private OrgUnit GetCleanedOrgUnit (OrgUnit orgUnit) {            
            orgUnit.HeadOfOrgUnit = orgUnit.HeadOfOrgUnit == null ? null : GetCleanedPerson (orgUnit.HeadOfOrgUnit);
            orgUnit.OrgUnitToFunctions = orgUnit.OrgUnitToFunctions == null ? null :
                orgUnit.OrgUnitToFunctions.Select (f => {
                    f.OrgUnit = null;
                    f.Person = GetCleanedPerson (f.Person);
                    return f;
                });
            orgUnit.ChildOrgUnits = orgUnit.ChildOrgUnits.Select (o => GetCleanedOrgUnit (o));
            orgUnit.Parent = null;
            return orgUnit;
        }

        private Person GetCleanedPerson (Person person) {
            person.OwnedOrgUnits = null;
            person.OrgUnit = null;
            person.OrgUnitFunctions = null;
            return person;
        }

        private async Task<ICollection<OrgUnit>> includeDependenciesAsync (IQueryable<OrgUnit> query) {
            return await query
                .AsNoTracking ()
                .Include (o => o.ChildOrgUnits)
                .Include (o => o.OrgUnitToFunctions)
                .ThenInclude (o => o.Person)
                .Include (o => o.HeadOfOrgUnit)
                .ToListAsync () // We need this always. If you remove this line you don't get the tree of the orgunit...
            ;

        }
    }
}
