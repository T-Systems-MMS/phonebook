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
    public class FloorController : ControllerBase
    {
        public ModelContext Context { get; }

        public FloorController(ModelContext context)
        {
            Context = context;
        }
        // GET: api/Floor
        [HttpGet]
        public IEnumerable<Floor> Get()
        {
            return Context.Floors;
        }

        // GET: api/Floor/5
        [HttpGet("{id}")]
        public Floor Get(int id)
        {
            return Context.Floors.First(f => f.Id == id);
        }

        // POST: api/Floor
        [HttpPost]
        public void Post([FromBody] Floor value)
        {
        }

        // PUT: api/Floor/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Floor value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
