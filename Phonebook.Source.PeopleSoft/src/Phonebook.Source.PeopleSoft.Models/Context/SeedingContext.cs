

using Microsoft.EntityFrameworkCore;
using System.IO;

namespace Phonebook.Source.PeopleSoft.Models.Context
{
    public class SeedingContext : ModelContext
    {
        public SeedingContext() : base()
        {

        }
        public SeedingContext(DbContextOptions<SeedingContext> options)
            : base(options)
        {
        }

        #region Location
        private const int LocationDresdenId = 1;
        private const int LocationBerlinId = 2;
        private const int LocationNewYorkId = 3;
        #endregion Location

        #region Building
        private const int BuildingR5Id = 1;
        private const int BuildingHygId = 2;
        private const int BuildingJSId = 3;
        private const int BuildingA1Id = 4;
        #endregion Building

        #region Floor
        private const int FloorR5BasementId = 1;
        private const int FloorR5Id = 2;
        private const int FloorHygId = 3;
        private const int FloorJSId = 4;
        private const int FloorA1Id = 5;
        #endregion Floor

        #region BuildingPart
        private const int BuildingPartR5BasementId = 1;
        private const int BuildingPartR5Id = 2;
        private const int BuildingPartHygId = 3;
        private const int BuildingPartJSId = 4;
        private const int BuildingPartA1Id = 5;
        #endregion BuildingPart

        #region Room
        private const int RoomR5Id = 1;
        private const int RoomR5BasementId = 2;
        private const int RoomA1Id = 3;
        private const int RoomHygId = 4;
        private const int RoomJS1Id = 5;
        private const int RoomJS2Id = 6;
        private const int RoomJS3Id = 7;

        #endregion

        #region OrgUnit
        private const int OrgUnit1Id = 1;
        private const int OrgUnit2Id = 2;
        private const int OrgUnit3Id = 3;
        private const int OrgUnit4Id = 4;
        #endregion OrgUnit

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

        #region Person 
        private const int Person1Id = 1;
        private const int Person2Id = 2;
        private const int Person3Id = 3;
        private const int Person4Id = 4;
        private const int Person5Id = 5;
        private const int Person6Id = 6;
        #endregion Person

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            #region Location
            modelBuilder.Entity<Location>().HasData(new Location { Id = LocationDresdenId, Country = "DE", ShortName = null, Name = "Dresden" });
            modelBuilder.Entity<Location>().HasData(new Location { Id = LocationBerlinId, Country = "DE", ShortName = "B", Name = "Berlin" });
            modelBuilder.Entity<Location>().HasData(new Location { Id = LocationNewYorkId, Country = "USA", ShortName = "NY", Name = "New York" });
            #endregion Location

            #region Building
            modelBuilder.Entity<Building>().HasData(new Building { Id = BuildingR5Id, Name = "Risaer Straße", Number = "5", Address = "DD/Riesaer Straße 5, 01129 Dresden", ShortName = "R5", LocationId = LocationDresdenId });
            modelBuilder.Entity<Building>().HasData(new Building { Id = BuildingHygId, Name = "Lingnerplatz", Number = "1", Address = "DD/Lingnerplatz 1, 01069 Dresden", ShortName = "HYG", LocationId = LocationDresdenId });
            modelBuilder.Entity<Building>().HasData(new Building { Id = BuildingJSId, Name = "Jump Street", Number = "21", Address = "NY/Jump Street 21, 00501 New York", ShortName = "JS", LocationId = LocationNewYorkId });
            modelBuilder.Entity<Building>().HasData(new Building { Id = BuildingA1Id, Name = "Alexanderplatz", Number = "124", Address = "B/Alexanderplatz 124, 10117 Berlin", ShortName = "A1", LocationId = LocationBerlinId });
            #endregion Building

            #region Floor
            modelBuilder.Entity<Floor>().HasData(new Floor { Id = FloorR5BasementId, Description = "DD/R5/-1. Etage", Number = -1, BuildingId = BuildingR5Id });
            modelBuilder.Entity<Floor>().HasData(new Floor { Id = FloorR5Id, Description = null, Number = 0, BuildingId = BuildingR5Id });
            modelBuilder.Entity<Floor>().HasData(new Floor { Id = FloorHygId, Description = null, Number = 5, BuildingId = BuildingHygId });
            modelBuilder.Entity<Floor>().HasData(new Floor { Id = FloorJSId, Description = null, Number = 5, BuildingId = BuildingJSId });
            modelBuilder.Entity<Floor>().HasData(new Floor { Id = FloorA1Id, Description = null, Number = 5, BuildingId = BuildingA1Id });
            #endregion Floor

            #region BuildingPart
            modelBuilder.Entity<BuildingPart>().HasData(new BuildingPart { Id = BuildingPartR5BasementId, Description = "Part A", BuildingId = BuildingR5Id });
            modelBuilder.Entity<BuildingPart>().HasData(new BuildingPart { Id = BuildingPartR5Id, Description = "Part A to C", BuildingId = BuildingR5Id });
            modelBuilder.Entity<BuildingPart>().HasData(new BuildingPart { Id = BuildingPartHygId, Description = "A - C", BuildingId = BuildingHygId });
            modelBuilder.Entity<BuildingPart>().HasData(new BuildingPart { Id = BuildingPartJSId, Description = "2-G45454", BuildingId = BuildingJSId });
            modelBuilder.Entity<BuildingPart>().HasData(new BuildingPart { Id = BuildingPartA1Id, Description = "Building F5", BuildingId = BuildingA1Id });
            #endregion BuildingPart

            #region Room
            modelBuilder.Entity<Room>().HasData(new Room { Id = RoomR5Id, Number = "1.004785", Map = "sample_static", BuildingPartId = BuildingPartR5Id, FloorId = FloorR5Id });
            modelBuilder.Entity<Room>().HasData(new Room { Id = RoomR5BasementId, Number = "N100.45", Map = "sample_highlight", BuildingPartId = BuildingPartR5BasementId, FloorId = FloorR5BasementId });
            modelBuilder.Entity<Room>().HasData(new Room { Id = RoomA1Id, Number = "545", Map = "sample_static", BuildingPartId = BuildingPartA1Id, FloorId = FloorA1Id });
            modelBuilder.Entity<Room>().HasData(new Room { Id = RoomHygId, Number = "0.0454a", Map = "sample_highlight", BuildingPartId = BuildingPartHygId, FloorId = FloorHygId });
            modelBuilder.Entity<Room>().HasData(new Room { Id = RoomJS1Id, Number = "Apl", Map = "sample_static", BuildingPartId = BuildingPartJSId, FloorId = FloorJSId });
            modelBuilder.Entity<Room>().HasData(new Room { Id = RoomJS2Id, Number = "F-54689", Map = "sample_highlight", BuildingPartId = BuildingPartJSId, FloorId = FloorJSId });
            modelBuilder.Entity<Room>().HasData(new Room { Id = RoomJS3Id, Number = "F54689", Map = "sample_static", BuildingPartId = BuildingPartJSId, FloorId = FloorJSId });
            #endregion Room

            #region OrgUnit
            modelBuilder.Entity<OrgUnit>().HasData(new OrgUnit { Id = OrgUnit1Id, Name = "Anrufbeantworter Certificate Authority", ShortName = "AB CA", ParentId = null, CostCenter = null });
            modelBuilder.Entity<OrgUnit>().HasData(new OrgUnit { Id = OrgUnit2Id, Name = "Anrufbeantworter Customer Unit", ShortName = "AB CU", ParentId = OrgUnit1Id, CostCenter = "5001", HeadOfOrgUnitId = Person1Id });
            modelBuilder.Entity<OrgUnit>().HasData(new OrgUnit { Id = OrgUnit3Id, Name = "Business Community Automation and Buildings", ShortName = "BC AB", ParentId = OrgUnit1Id, CostCenter = "5002" });
            modelBuilder.Entity<OrgUnit>().HasData(new OrgUnit { Id = OrgUnit4Id, Name = "Business Community Yellow", ShortName = "BC Yellow", ParentId = OrgUnit3Id, CostCenter = "5003"  });
            #endregion OrgUnit

            #region Status
            modelBuilder.Entity<Status>().HasData(new Status { Id = Status1Id, Name = "head of", Code = "Ho" });
            modelBuilder.Entity<Status>().HasData(new Status { Id = Status2Id, Name = "internal employee", Code = "IE"});
            modelBuilder.Entity<Status>().HasData(new Status { Id = Status3Id, Name = "external employee", Code = "EX" });
            modelBuilder.Entity<Status>().HasData(new Status { Id = Status4Id, Name = "student employee", Code = "SE" });
            #endregion Status

            #region Funktion
            modelBuilder.Entity<Function>().HasData(new Function { Id = Function1Id, Code = "SO", Label = "software engineer" });
            modelBuilder.Entity<Function>().HasData(new Function { Id = Function2Id, Code = "SY", Label = "system engineer" });
            modelBuilder.Entity<Function>().HasData(new Function { Id = Function3Id, Code = "HO", Label = "head of" });
            modelBuilder.Entity<Function>().HasData(new Function { Id = Function4Id, Code = string.Empty, Label = string.Empty });
            #endregion Funktion           

            #region Person
            modelBuilder.Entity<Person>().HasData(new Person { Id = Person1Id, ShortName = "KAPA", EMail = "klaus.peter@example.org", FAX = "+49123 4567899", FirstName = "Klaus", LastName = "Peter", MobilPhone = "+49123 4567898", Phone = "+49123 4567897", Title = "Dr.", StatusId = Status1Id, FunctionId = Function3Id, OrgUnitId = OrgUnit1Id });
            modelBuilder.Entity<Person>().HasData(new Person { Id = Person2Id, ShortName = "PEMU", EMail = "Petra.Müller@example.org", FAX = "+49123 4567896", FirstName = "Petra", LastName = "Müller", MobilPhone = "+49123 4567895", Phone = "+49123 4567894", Title = null, StatusId = Status2Id, FunctionId = Function1Id, OrgUnitId = OrgUnit2Id });
            modelBuilder.Entity<Person>().HasData(new Person { Id = Person3Id, ShortName = "MAAD", EMail = "Malika.Adøms@example.org", FAX = "+49123 4567893", FirstName = "Malika", LastName = "Adøms", MobilPhone = "+49123 4567892", Phone = "+49123 4567891", Title = null, StatusId = Status3Id, FunctionId = Function2Id, OrgUnitId = OrgUnit3Id });
            modelBuilder.Entity<Person>().HasData(new Person { Id = Person4Id, ShortName = "PEMO", EMail = "Peter.Möller@example.org", FAX = "+49123 4567890", FirstName = "Peter", LastName = "Möller", MobilPhone = "+49123 4567889", Phone = "+49123 4567888", Title = null, StatusId = Status1Id, FunctionId = Function4Id, OrgUnitId = OrgUnit4Id });
            modelBuilder.Entity<Person>().HasData(new Person { Id = Person5Id, ShortName = "IMBA", EMail = "Imélda.Bâtz@example.org", FAX = "+49123 4567887", FirstName = "Imélda", LastName = "Bâtz", MobilPhone = "+49123 4567886", Phone = "+49123 4567885", Title = null, StatusId = Status2Id, FunctionId = Function1Id, OrgUnitId = OrgUnit1Id });
            modelBuilder.Entity<Person>().HasData(new Person { Id = Person6Id, ShortName = "JAPF", EMail = "Jàbari.Pfånnærstill@example.org", FAX = "+49123 4567884", FirstName = "Jàba'ri", LastName = "Pfånnærstill", MobilPhone = "+49123 4567883", Phone = "+49123 4567882", Title = null, StatusId = Status3Id, FunctionId = Function2Id, OrgUnitId = OrgUnit2Id });
            #endregion Person

            #region OrgUnitToFunktion
            modelBuilder.Entity<OrgUnitToFunction>().HasData(new OrgUnitToFunction { FunctionId = Function1Id, OrgUnitId = OrgUnit1Id, PersonId = Person1Id ,RoleName = "ABC"  });
            modelBuilder.Entity<OrgUnitToFunction>().HasData(new OrgUnitToFunction { FunctionId = Function2Id, OrgUnitId = OrgUnit2Id, PersonId = Person2Id, RoleName = "ABCD" });
            modelBuilder.Entity<OrgUnitToFunction>().HasData(new OrgUnitToFunction { FunctionId = Function3Id, OrgUnitId = OrgUnit3Id, PersonId = Person3Id, RoleName = "ABCDE" });
            modelBuilder.Entity<OrgUnitToFunction>().HasData(new OrgUnitToFunction { FunctionId = Function3Id, OrgUnitId = OrgUnit3Id, PersonId = Person4Id, RoleName = "ABCDEF" });
            modelBuilder.Entity<OrgUnitToFunction>().HasData(new OrgUnitToFunction { FunctionId = Function4Id, OrgUnitId = OrgUnit4Id, PersonId = Person5Id, RoleName = "ABCDEFG" });
            modelBuilder.Entity<OrgUnitToFunction>().HasData(new OrgUnitToFunction { FunctionId = Function1Id, OrgUnitId = OrgUnit2Id, PersonId = Person6Id, RoleName = "ABCDEFGH" });
            #endregion OrgUnitToFunktion

        }
    }
}
