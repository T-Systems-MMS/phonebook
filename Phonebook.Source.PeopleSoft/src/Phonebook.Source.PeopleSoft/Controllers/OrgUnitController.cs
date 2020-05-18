using System.Collections.Generic;
using System.Linq;
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
        public IEnumerable<OrgUnit> Get()
        {
            return Context.Get();

        }

        // GET: api/OrgUnit/5
        [HttpGet("{id}")]
        public OrgUnit Get(int id)
        {
            return Context.Get(id);
        }        
    }
}
