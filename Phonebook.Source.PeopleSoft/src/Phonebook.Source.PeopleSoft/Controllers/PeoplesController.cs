using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Phonebook.Source.PeopleSoft.Services;
using static Phonebook.Source.PeopleSoft.Services.PeopleService;

namespace Phonebook.Source.PeopleSoft.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeoplesController : ControllerBase
    {
        private readonly PeopleService service;

        public PeoplesController(PeopleService service)
        {
            this.service = service;
        }
        // GET api/values
        [HttpGet]
        public IEnumerable<People> Get()
        {
            return service.GetPeoples();
        }

        // GET api/values/hans
        [HttpGet("{search}")]
        public IEnumerable<People> Get(string search)
        {
            return service.GetPeoples(search);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
