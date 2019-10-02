using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            return this.inlcudeDependencies(Context.Rooms);
        }

        // GET: api/Room/5
        [HttpGet("{id}")]
        public Room Get(int id)
        {
            return this.inlcudeDependencies(Context.Rooms).First(r => r.Id == id);
        }

        private IQueryable<Room> inlcudeDependencies(IQueryable<Room> query)
        {
            return query
                .AsNoTracking()
                .Include(r => r.Members)
                .Include(r => r.Floor)
                .Include(r => r.BuildingPart);

        }
    }
}
