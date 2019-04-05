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
    public class PeopleController : ControllerBase
    {
        public ModelContext Context { get; }

        public PeopleController(ModelContext context)
        {
            Context = context;
        }
        // GET: api/People
        [HttpGet]
        public IEnumerable<Person> Get()
        {
            return Context.Peoples;
        }

        // GET: api/People/5
        [HttpGet("{id}")]
        public Person Get(int id)
        {
            return Context.Peoples.First(p => p.Id == id);
        }

        // POST: api/People
        [HttpPost]
        public void Post([FromBody] Person value)
        {
        }

        // PUT: api/People/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Person value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
