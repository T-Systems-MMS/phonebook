using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Phonebook.Source.PeopleSoft.Models;
using Phonebook.Source.PeopleSoft.Models.Context;

namespace Phonebook.Source.PeopleSoft.Controllers {
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class LocationController : ControllerBase {
    public ModelContext Context { get; }
    public LocationController(ModelContext context) { Context = context; }
    // GET: api/Location
    [HttpGet]
    public IEnumerable<Location>
    Get() {
      return this.inlcudeDependencies(Context.Locations);
    }

    // GET: api/Location/5
    [HttpGet("{id}")]
    public Location
    Get(int id) {
      return this.inlcudeDependencies(Context.Locations).First(l => l.Id == id);
    }

    private IQueryable<Location>inlcudeDependencies(IQueryable<Location>query) {
      return query.AsNoTracking()
          .Include(f => f.Buildings)
          .ThenInclude(b => b.Floors);
    }
  }
}
