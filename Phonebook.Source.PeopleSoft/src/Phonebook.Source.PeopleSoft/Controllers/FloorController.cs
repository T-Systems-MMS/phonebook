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
  public class FloorController : ControllerBase {
    public ModelContext Context { get; }

    public FloorController(ModelContext context) { Context = context; }
    // GET: api/Floor
    [HttpGet]
    public IEnumerable<Floor>
    Get() {
      return this.inlcudeDependencies(Context.Floors);
    }

    // GET: api/Floor/5
    [HttpGet("{id}")]
    public Floor
    Get(int id) {
      return this.inlcudeDependencies(Context.Floors).First(f => f.Id == id);
    }

    private IQueryable<Floor>inlcudeDependencies(IQueryable<Floor>query) {
      return query.AsNoTracking()
          .Include(f => f.Building)
          .Include(f => f.Rooms)
          .ThenInclude(r => r.Members);
    }
  }
}
