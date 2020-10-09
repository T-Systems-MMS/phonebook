using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Phonebook.Source.PeopleSoft.Models;
using Phonebook.Source.PeopleSoft.Models.Context;
using Phonebook.Source.PeopleSoft.Repositories;

namespace Phonebook.Source.PeopleSoft.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrgUnitController : ControllerBase
    {
        public IRepository<OrgUnit> Context { get; }

        public OrgUnitController(IRepository<OrgUnit> context)
        {
            Context = context;
        }
        // GET: api/OrgUnit
        [HttpGet]
        public async Task<IEnumerable<OrgUnit>> Get()
        {
            return await Context.Get();

        }

        // GET: api/OrgUnit/5
        [HttpGet("{id}")]
        public async Task<OrgUnit> Get(int id)
        {
            return await Context.Get(id);
        }        
    }
}
