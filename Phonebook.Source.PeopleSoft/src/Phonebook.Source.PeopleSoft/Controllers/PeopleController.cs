using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            return this.inlcudeDependencies(Context.Peoples);
        }

        // GET: api/People/5
        [HttpGet("{id}")]
        public Person Get(int id)
        {
            return this.inlcudeDependencies(Context.Peoples).First(p => p.Id == id);
        }

        private IEnumerable<Person> inlcudeDependencies(IQueryable<Person> query)
        {
            return query
                    .AsNoTracking()
                    .Include(p => p.OrgUnit)
                    .Include(p => p.Room)                    
                    // the following select will remove cicle references
                    .Select(p =>
                    new Person() {
                      Id= p.Id,
                      EMail = p.EMail,
                      FAX = p.FAX,
                      FirstName = p.FirstName,
                      FunctionId = p.FunctionId,
                      LastName = p.LastName,
                      MobilPhone = p.MobilPhone,
                      OrgUnit = p.OrgUnit != null ? new OrgUnit(){
                        CostCenter = p.OrgUnit.CostCenter,
                        Id = p.OrgUnit.Id,
                        Name = p.OrgUnit.Name,
                        ShortName = p.ShortName
                      } : null,
                      OrgUnitId = p.OrgUnitId,
                      Phone = p.Phone,
                      Room = p.Room != null ? new Room(){
                          Id = p.Room.Id,
                          BuildingPartId = p.Room.BuildingPartId,
                          FloorId = p.Room.FloorId,
                          Map = p.Room.Map,
                          Number = p.Room.Number
                      } : null,
                      ShortName = p.ShortName,
                      StatusId = p.StatusId,
                      Title = p.Title,
                      RoomId = p.RoomId
                    });

        }
    }
}
