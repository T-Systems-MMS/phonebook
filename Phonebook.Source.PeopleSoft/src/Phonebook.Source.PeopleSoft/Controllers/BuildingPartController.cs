using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Phonebook.Source.PeopleSoft.Models;

namespace Phonebook.Source.PeopleSoft.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingPartController : ControllerBase
    {
        public ModelContext Context { get; }

        public BuildingPartController(ModelContext context)
        {
            Context = context;
        }
        // GET: api/BuildingPart
        [HttpGet]
        public IEnumerable<BuildingPart> Get()
        {
            return this.inlcudeDependencies(Context.BuildingParts);
        }

        // GET: api/BuildingPart/5
        [HttpGet("{id}")]
        public BuildingPart Get(int id)
        {
            return this.inlcudeDependencies(Context.BuildingParts).First(b => b.Id == id);
        }

        private IQueryable<BuildingPart> inlcudeDependencies(IQueryable<BuildingPart> query)
        {
            var extendedResult = query
                .Include(b => b.Building)
                    .ThenInclude(b => b.Location)
                .Include(b => b.Rooms);
            return extendedResult;
        }
        
    }
}
