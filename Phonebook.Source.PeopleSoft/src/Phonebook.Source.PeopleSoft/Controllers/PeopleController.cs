using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Oracle.EntityFrameworkCore.Storage.Internal;
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
                    .Include(p => p.Status)
                    .Include(p => p.Function)
                    .Include(p => p.OrgUnit)
                        .ThenInclude(o => o.Parent)
                    .Include(p => p.Room)
                        .ThenInclude(r => r.BuildingPart)
                            .ThenInclude(b => b.Building)
                                .ThenInclude(b => b.Location)
                    .Include(p => p.Room)
                        .ThenInclude(r => r.Floor)
                    .Include(p => p.Room)
                    .OrderBy(p => p.Id)
                    .ToList()
                    // the following select will remove cicle references
                    .Select(p =>
                    new Person()
                    {
                        Id = p.Id,
                        EMail = p.EMail,
                        FAX = p.FAX,
                        FirstName = p.FirstName,
                        FunctionId = p.FunctionId,
                        Function = p.Function != null ? new Function() { Id = p.Function.Id, Label = p.Function.Label, Code = p.Function.Code }: null,
                        LastName = p.LastName,
                        MobilPhone = p.MobilPhone,
                        OrgUnit = p.OrgUnit != null ? createOrgUnitTree(p.OrgUnit) : null,
                        OrgUnitId = p.OrgUnitId,
                        Phone = p.Phone,
                        Room = p.Room != null ? createRoomTree(p.Room) : null,
                        ShortName = p.ShortName,
                        StatusId = p.StatusId,
                        Status = p.Status != null ? new Status() { Id = p.Status.Id, Name = p.Status.Name, Code = p.Status.Code}: null,
                        Title = p.Title,
                        RoomId = p.RoomId
                    });

        }

        private Room createRoomTree(Room room)
        {
            var result = new Room();
            result.BuildingPart = room.BuildingPart != null ? new BuildingPart()
            {
                Description = room.BuildingPart.Description,
                Id = room.BuildingPart.Id,
                BuildingId = room.BuildingPart.BuildingId,
                Building = room.BuildingPart.Building != null ? new Building() {
                     Address = room.BuildingPart.Building.Address,
                     Id = room.BuildingPart.Building.Id,
                     Name = room.BuildingPart.Building.Name,
                     ShortName = room.BuildingPart.Building.ShortName,
                     LocationId = room.BuildingPart.Building.LocationId,
                     Location = room.BuildingPart.Building.Location != null ? new Location() { 
                         ShortName = room.BuildingPart.Building.Location.ShortName,
                         Name = room.BuildingPart.Building.Location.Name,
                         Country = room.BuildingPart.Building.Location.Country,
                         Id = room.BuildingPart.Building.Location.Id
                     } : null
                }: null
            }: null;
            result.Id = room.Id;
            result.FloorId = room.FloorId;
            result.Map = room.Map;
            result.Number = room.Number;
            result.Floor = room.Floor != null ? new Floor()
            {
                Id = room.Floor.Id,
                BuildingId = room.Floor.BuildingId,
                Describtion = room.Floor.Describtion                
            } : null;

            return result;
        }

        private OrgUnit createOrgUnitTree(OrgUnit orgUnit)
        {
            var result = new OrgUnit();
            result.Id = orgUnit.Id;
            result.Name = orgUnit.Name;
            result.Parent = orgUnit.Parent != null ? createOrgUnitTree(orgUnit.Parent) : null;
            result.ParentId = orgUnit.ParentId;
            result.ShortName = orgUnit.ShortName;
            result.CostCenter = orgUnit.CostCenter;
            return result;
        }
    }
}
