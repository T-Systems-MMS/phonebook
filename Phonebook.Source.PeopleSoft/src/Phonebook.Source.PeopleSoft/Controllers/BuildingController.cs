using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Phonebook.Source.PeopleSoft.Models;

namespace Phonebook.Source.PeopleSoft.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingController : ControllerBase
    {
        public ModelContext Context { get; }

        public BuildingController(ModelContext context)
        {
            Context = context;
        }
        // GET: api/Building
        [HttpGet]
        public IEnumerable<Building> Get()
        {
            return Context.Buildings;
        }

        // GET: api/Building/5
        [HttpGet("{id}")]
        public Building Get(int id)
        {
            return Context.Buildings.First(b => b.Id == id);
        }

        // POST: api/Building
        [HttpPost]
        public void Post([FromBody] Building value)
        {
        }

        // PUT: api/Building/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Building value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
