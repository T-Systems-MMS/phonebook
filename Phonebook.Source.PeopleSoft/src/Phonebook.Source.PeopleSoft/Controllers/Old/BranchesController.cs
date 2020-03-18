using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Phonebook.Source.PeopleSoft.Models;

namespace Phonebook.Source.PeopleSoft.Controllers.Old
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase
    {
        private readonly ModelContext context;

        public BranchesController(Models.ModelContext context)
        {
            this.context = context;
        }

        // GET: api/Room
        [HttpGet]
        public IEnumerable<dynamic> Get()
        {
            return this.inlcudeDependencies(context.Rooms)
                .Select(b => new
                {
                    ContactPerson = string.Empty,
                    LinkRoutingWebsite = $"http://maps.google.de/maps?f=q&hl=de&q={b?.Key.Name} {b?.Key?.Number},  {b?.Key.Location.Name}",
                    ReceptionFax = string.Empty,
                    Description = b.Key.Address,
                    ReceptionPhone = string.Empty,
                    LinkPicture = string.Empty,
                    LinkRoutingInfo = string.Empty,
                    City = new
                    {
                        Name = b?.Key?.Location?.Name,
                        Building = $"{b?.Key?.Name} {b?.Key?.Number}",
                        ZipCode = Regex.Replace(b.Key.Address, ".*, ([0-9]*) .*", "$1")
                    },
                    RoomCollection = b?.Select(d =>  new
                    {
                        Building = $"{d?.Floor?.Building?.Name} {d?.Floor?.Building?.Number}",
                        BuildingId = d?.Floor?.BuildingId,
                        Floor = d?.Floor?.Number,
                        Description = $"{d?.Floor?.Building?.Location?.Name}, {d?.Floor?.Building?.Name} {d?.Floor?.Building?.Number}, {d?.BuildingPart?.Description}, Raum {d?.Number}",
                        Phone = string.Empty,
                        Number = d?.Number,
                        Id = d?.Id,
                        Place = d?.Floor?.Building?.Location?.Name,
                        FloorPlan = d?.Map
                    })
                })
                ;
        }

        private IEnumerable<IGrouping<Building, Room>> inlcudeDependencies(IQueryable<Room> query)
        {
            return query
                .AsNoTracking()
                .Include(r => r.Members)
                .Include(r => r.Floor)
                    .ThenInclude(f => f.Building)
                        .ThenInclude(b => b.Location)
                .Include(r => r.BuildingPart)
                    .ThenInclude(b => b.Building)
                        .ThenInclude(b => b.Location)
                .ToList()
                .GroupBy(d => d.Floor.Building);

        }
    }
}