using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Phonebook.Source.PeopleSoft.Models;
using Phonebook.Source.PeopleSoft.Models.Context;

namespace Phonebook.Source.PeopleSoft.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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
            return this.InlcudeDependencies(Context.Buildings);
        }

        // GET: api/Building/5
        [HttpGet("{id}")]
        public Building Get(int id)
        {
            return this.InlcudeDependencies(Context.Buildings).First(b => b.Id == id);
        }

        private IQueryable<Building> InlcudeDependencies(IQueryable<Building> query)
        {
            return query
                    .AsNoTracking()
                    .Include(b => b.Location)
                    .Include(b => b.BuildingParts)
                    .Include(b => b.Floors)
                        .ThenInclude(f => f.Rooms)
                    // the following select will remove cycle references
                    .Select(b => new Building()
                    {
                        ShortName = b.ShortName,
                        Address = b.Address,
                        Name = b.Name,
                        Id = b.Id,
                        LocationId = b.LocationId,
                        Location = b.Location != null ? new Location()
                        {
                            Id = b.Location.Id,
                            Country = b.Location.Country,
                            Name = b.Location.Name,
                            ShortName = b.Location.ShortName
                        } : null,
                        BuildingParts = b.BuildingParts != null? b.BuildingParts.Select(bp => new BuildingPart()
                        {
                            BuildingId = bp.BuildingId,
                            Id = bp.Id,
                            Description = bp.Description
                        }) : null,
                        Floors = b.Floors != null ? b.Floors.Select(f => new Floor()
                        {
                            Id = f.Id,
                            BuildingId = f.BuildingId,
                            Description = f.Description,
                            Rooms = f.Rooms.Select(r =>
                            new Room(){
                                Id =r.Id,
                                FloorId = r.FloorId,
                                Map = r.Map,
                                Number = r.Number
                            })
                        }): null
                    });
        }
    }
}
