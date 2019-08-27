using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Phonebook.Source.PeopleSoft.Models;

namespace Phonebook.Source.PeopleSoft.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrgUnitController : ControllerBase
    {
        public ModelContext Context { get; }

        public OrgUnitController(ModelContext context)
        {
            Context = context;
        }
        // GET: api/OrgUnit
        [HttpGet]
        public IEnumerable<OrgUnit> Get()
        {
            return Context
                .OrgUnits
                // Distinct groups because our data source is currently not so good.
                .GroupBy(d => d.CostCenter)    
                .AsNoTracking()
                .AsEnumerable()
                .Select(d => d.First());
        }

        // GET: api/OrgUnit/5
        [HttpGet("{id}")]
        public OrgUnit Get(int id)
        {
            return Context.OrgUnits.First(o => o.Id == id);
        }

        // POST: api/OrgUnit
        [HttpPost]
        public void Post([FromBody] OrgUnit value)
        {
        }

        // PUT: api/OrgUnit/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] OrgUnit value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
