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
    public class RoomController : ControllerBase
    {
        public ModelContext Context { get; }
        public RoomController(ModelContext context)
        {
            Context = context;
        }
        // GET: api/Room
        [HttpGet]
        public IEnumerable<Room> Get()
        {
            return Context.Rooms;
        }

        // GET: api/Room/5
        [HttpGet("{id}")]
        public Room Get(int id)
        {
            return Context.Rooms.First(r => r.Id == id);
        }

        // POST: api/Room
        [HttpPost]
        public void Post([FromBody] Room value)
        {
        }

        // PUT: api/Room/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Room value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
