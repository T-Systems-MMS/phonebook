using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Phonebook.Source.PeopleSoft.Models;

namespace Phonebook.Source.PeopleSoft.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RoomsController : ControllerBase
    {
        public ModelContext Context { get; }
        public RoomsController(ModelContext context)
        {
            Context = context;
        }
        // GET: api/Room
        [HttpGet]
        public IEnumerable<dynamic> Get()
        {
            return this.inlcudeDependencies(Context.Rooms)
                .Select(d => new
                {
                    Building = $"{d?.Floor?.Building?.Name} {d?.Floor?.Building?.Number}",
                    BuildingId = d?.Floor?.BuildingId,
                    Floor = d?.Floor?.Number,
                    Description = $"{d?.Floor?.Building?.Location?.Name}, {d?.Floor?.Building?.Name} {d?.Floor?.Building?.Number} {d?.BuildingPart?.Description}, Raum {d?.Number}",
                    Phone = string.Empty,
                    Number = d?.Number,
                    Id = d?.Id,
                    Place = d?.Floor?.Building?.Location?.Name,
                    FloorPlan = d?.Map
                })
                ;
        }

        // GET: api/Room/5
        [HttpGet("{id}")]
        public Room Get(int id)
        {
            return this.inlcudeDependencies(Context.Rooms).First(r => r.Id == id);
        }

        private IEnumerable<Room> inlcudeDependencies(IQueryable<Room> query)
        {
            return query
                .AsNoTracking()
                .Include(r => r.Members)
                .Include(r => r.Floor)
                    .ThenInclude(f => f.Building)
                        .ThenInclude(b => b.Location)
                .Include(r => r.BuildingPart)
                    .ThenInclude(b => b.Building)
                        .ThenInclude(b => b.Location);

        }
    }
}
