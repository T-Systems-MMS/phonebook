

using Bogus;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;

namespace Phonebook.Source.PeopleSoft.Models.Context {
  public class SeedingContext : ModelContext {
    public SeedingContext() : base() {}
    public SeedingContext(DbContextOptions<SeedingContext>options)
        : base(options) {}

#region Status
    private const int Status1Id = 1;
    private const int Status2Id = 2;
    private const int Status3Id = 3;
    private const int Status4Id = 4;
#endregion Status

#region Funktion
    private const int Function1Id = 1;
    private const int Function2Id = 2;
    private const int Function3Id = 3;
    private const int Function4Id = 4;
#endregion Funktion

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
      base.OnModelCreating(modelBuilder);

      var roomNumbers = new[]{"1A",      "2A",  "3A",       "4A",      "5A",
                              "6A",      "1B",  "2B",       "3B",      "4B",
                              "5B",      "6B",  "1.004785", "N100.45", "545",
                              "0.0454a", "Apl", "F-54689",  "F54689"};

#region Location

      var maxLocation = 3;
      var locationFaker =
          new Faker<Location>().StrictMode(false).Rules((f, l) => {
            var address = f.Address;
            l.Id = f.IndexVariable++ + 1;
            l.Country = address.CountryCode();
            l.ShortName = new Bogus.Randomizer().Replace("??");
            l.Name = address.City();
          });
      var locationList = Enumerable.Range(1, maxLocation)
                             .Select(_ => locationFaker.Generate());
      foreach(var location in locationList) {
        modelBuilder.Entity<Location>().HasData(location);
      }

#endregion Location

#region Building

      var maxBuildings = 10;
      var buildingFaker =
          new Faker<Building>().StrictMode(false).Rules((f, b) => {
            var address = f.Address;
            b.Id = f.IndexVariable++ + 1;
            b.Name = address.StreetName();
            b.Number = address.BuildingNumber();
            b.Address = address.FullAddress();
            b.ShortName = new Bogus.Randomizer().Replace("???");
            b.LocationId = f.Random.Number(1, maxLocation);
          });
      var buildingList = Enumerable.Range(1, maxBuildings)
                             .Select(_ => buildingFaker.Generate())
                             .ToList();
      foreach(var building in buildingList) {
        modelBuilder.Entity<Building>().HasData(building);
      }

#endregion Building

#region Floor
      var maxFloors = 100;
      var floorFaker = new Faker<Floor>().StrictMode(false).Rules((f, b) => {
        b.Id = f.IndexVariable++ + 1;
        b.Number = new Bogus.Randomizer().Number(-5, 20);
        b.Description =
            new Bogus.Randomizer().Replace($"??/?#/{b.Number}. Etage");
        b.BuildingId = f.PickRandom(buildingList).Id;
      });
      var floorList = Enumerable.Range(1, maxFloors)
                          .Select(_ => floorFaker.Generate())
                          .ToList();
      foreach(var floor in floorList) {
        modelBuilder.Entity<Floor>().HasData(floor);
      }
#endregion Floor

#region BuildingPart

      var maxBuildingParts = 40;
      var BuildingPartFaker =
          new Faker<BuildingPart>().StrictMode(false).Rules((f, b) => {
            b.Id = f.IndexVariable++ + 1;
            b.Description = new Bogus.Randomizer().Replace($"Part ?");
            b.BuildingId = f.PickRandom(buildingList).Id;
          });
      var BuildingPartList = Enumerable.Range(1, maxBuildingParts)
                                 .Select(_ => BuildingPartFaker.Generate())
                                 .ToList();
      foreach(var BuildingPart in BuildingPartList) {
        modelBuilder.Entity<BuildingPart>().HasData(BuildingPart);
      }
#endregion BuildingPart

#region Room

      var maxRooms = 1000;
      var RoomFaker = new Faker<Room>().StrictMode(false).Rules((f, b) => {
        b.Id = f.IndexVariable++ + 1;
        b.Number = f.PickRandom(roomNumbers);
        b.Map = f.PickRandom(new[]{"sample_static", "sample_highlight"});
        b.BuildingPartId = f.PickRandom(BuildingPartList).Id;
        b.FloorId = f.PickRandom(floorList).Id;
      });
      var RoomList = Enumerable.Range(1, maxRooms)
                         .Select(_ => RoomFaker.Generate())
                         .ToList();
      foreach(var Room in RoomList) {
        modelBuilder.Entity<Room>().HasData(Room);
      }
#endregion Room

#region OrgUnit
      var maxOrgUnits = 500;
      var OrgUnitFaker =
          new Faker<OrgUnit>().StrictMode(false).Rules((f, b) => {
            b.Id = f.IndexVariable++ + 1;
            b.Name = f.Commerce.Department();
            b.ShortName = new Bogus.Randomizer().Replace("**");
            b.ParentId = null;
            b.CostCenter = new Bogus.Randomizer().Replace("####");
          });
      var OrgUnitList = Enumerable.Range(1, maxOrgUnits)
                            .Select(_ => OrgUnitFaker.Generate())
                            .ToList();

      var boolRandomizer = new Bogus.Randomizer();
      var randomPicker = new Faker();
      foreach(var OrgUnit in OrgUnitList) {
        if (boolRandomizer.Bool()) {
          var maybeParent = randomPicker.PickRandom(OrgUnitList);
          while (maybeParent.Id == OrgUnit.Id ||
                 maybeParent.ParentId == OrgUnit.Id) {
            maybeParent = randomPicker.PickRandom(OrgUnitList);
          }

          OrgUnit.ParentId = maybeParent.ParentId;
        }
        modelBuilder.Entity<OrgUnit>().HasData(OrgUnit);
      }
#endregion OrgUnit

#region Status
      modelBuilder.Entity<Status>().HasData(
          new Status{Id = Status1Id, Name = "head of", Code = "Ho"});
      modelBuilder.Entity<Status>().HasData(
          new Status{Id = Status2Id, Name = "internal employee", Code = "IE"});
      modelBuilder.Entity<Status>().HasData(
          new Status{Id = Status3Id, Name = "external employee", Code = "EX"});
      modelBuilder.Entity<Status>().HasData(
          new Status{Id = Status4Id, Name = "student employee", Code = "SE"});
#endregion Status

#region Funktion
      modelBuilder.Entity<Function>().HasData(new Function{
          Id = Function1Id, Code = "SO", Label = "software engineer"});
      modelBuilder.Entity<Function>().HasData(new Function{
          Id = Function2Id, Code = "SY", Label = "system engineer"});
      modelBuilder.Entity<Function>().HasData(
          new Function{Id = Function3Id, Code = "HO", Label = "head of"});
      modelBuilder.Entity<Function>().HasData(new Function{
          Id = Function4Id, Code = string.Empty, Label = string.Empty});
#endregion Funktion

#region Person

      var maxPersons = 5000;
      var PersonFaker = new Faker<Person>().StrictMode(false).Rules((f, b) => {
        b.Id = f.IndexVariable++ + 1;
        b.ShortName = f.Random.Replace("####");
        b.EMail = f.Person.Email;
        b.FAX = f.Phone.PhoneNumber();
        b.FirstName = f.Name.FirstName();
        b.LastName = f.Name.LastName();
        b.MobilPhone = f.Phone.PhoneNumber();
        b.Phone = f.Phone.PhoneNumber();
        b.Title =
            f.PickRandom(new[]{"Dr.", string.Empty, string.Empty, "Prof."});
        b.StatusId = f.Random.Number(1, 4);
        b.FunctionId = f.Random.Number(1, 4);
        b.OrgUnitId = f.PickRandom(OrgUnitList).Id;
        b.RoomId = f.PickRandom(RoomList).Id;
      });
      var PersonList = Enumerable.Range(1, maxPersons)
                           .Select(_ => PersonFaker.Generate())
                           .ToList();
      foreach(var Person in PersonList) {
        if (boolRandomizer.Bool()) {
          var orgUnit = new Faker().PickRandom(OrgUnitList);
          if (orgUnit.Id != Person.OrgUnitId) {
            orgUnit.HeadOfOrgUnitId = Person.Id;
          }
        }
        modelBuilder.Entity<Person>().HasData(Person);
      }

#endregion Person

#region OrgUnitToFunktion

      var faker = new Faker();
      foreach(var person in PersonList) {

        modelBuilder.Entity<OrgUnitToFunction>().HasData(new OrgUnitToFunction{
            FunctionId = faker.Random.Number(1, 4),
            OrgUnitId = faker.PickRandom(OrgUnitList).Id, PersonId = person.Id,
            RoleName = faker.Random.Replace("###").ToUpper()});
      }
#endregion OrgUnitToFunktion
    }
  }
}
