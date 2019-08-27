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
    public class LocationController : ControllerBase
    {
        public ModelContext Context { get; }
        public LocationController(ModelContext context)
        {
            Context = context;
        }
        // GET: api/Location
        [HttpGet]
        public IEnumerable<Location> Get()
        {
            return Context.Locations.Include(d => d.Buildings).AsNoTracking();
        }

        // GET: api/Location/5
        [HttpGet("{id}")]
        public Location Get(int id)
        {
            return Context.Locations.First(l => l.Id == id);
        }

        // POST: api/Location
        [HttpPost]
        public void Post([FromBody] Location value)
        {
        }

        // PUT: api/Location/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Location value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
