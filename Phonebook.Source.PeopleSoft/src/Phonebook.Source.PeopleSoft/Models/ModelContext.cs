using Microsoft.EntityFrameworkCore;

namespace Phonebook.Source.PeopleSoft.Models
{
    public class ModelContext : DbContext
    {
        public ModelContext()
        {
        }

        public ModelContext(DbContextOptions<ModelContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:DefaultSchema", "PHONEBOOK2");

            // TODO: Yes I know all this "Tables" are views. But this is the solution for the ef core provider for oracle to join over views.

            //Location
            modelBuilder
                .Entity<Location>()
                .ToTable("V_STANDORT")
                    .HasMany<Building>(l => l.Buildings)
                    .WithOne(b => b.Location);

            // Building
            modelBuilder
                .Entity<Building>()
                .ToTable("V_GEBAEUDE")
                    .HasOne(b => b.Location)
                        .WithMany(l => l.Buildings)
                        .HasForeignKey(d => d.LocationId);
            modelBuilder
                .Entity<Building>()
                .ToTable("V_GEBAEUDE")
                    .HasMany(b => b.Floors)
                        .WithOne(f => f.Building);
            modelBuilder
                .Entity<Building>()
                .ToTable("V_GEBAEUDE")
                    .HasMany(b => b.BuildingParts)
                        .WithOne(p => p.Building);
            // Floor
            modelBuilder
                .Entity<Floor>()
                .ToTable("V_ETAGE")
                    .HasOne<Building>(f => f.Building)
                        .WithMany(b => b.Floors)
                        .HasForeignKey(f => f.BuildingId);
            modelBuilder
                .Entity<Floor>()
                .ToTable("V_ETAGE")
                    .HasMany<Room>(f => f.Rooms)
                        .WithOne(r => r.Floor)
                        .HasForeignKey(r => r.FloorId);

            // BuildingPart
            modelBuilder
                .Entity<BuildingPart>()
                .ToTable("V_GEBAEUDETEIL")
                    .HasOne<Building>(p => p.Building)
                        .WithMany(b => b.BuildingParts)
                        .HasForeignKey(p => p.BuildingId);
            modelBuilder
                .Entity<BuildingPart>()
                .ToTable("V_GEBAEUDETEIL")
                    .HasMany<Room>()
                        .WithOne(r => r.BuildingPart);
            // Room
            modelBuilder
                .Entity<Room>()
                .ToTable("V_RAUM")
                    .HasOne<BuildingPart>(r => r.BuildingPart)
                        .WithMany(p => p.Rooms)
                        .HasForeignKey(p => p.BuildingPartId);
            modelBuilder
                .Entity<Room>()
                .ToTable("V_RAUM")
                    .HasMany<Person>(r => r.Members)
                        .WithOne(p => p.Room);

            // OrgUnit
            modelBuilder
                .Entity<OrgUnit>()
                .ToTable("V_ORGEINHEIT")
                    .HasOne<OrgUnit>(p => p.Parent)
                        .WithMany()
                        .HasForeignKey(d => d.ParentId);
            modelBuilder
                .Entity<OrgUnit>()
                .ToTable("V_ORGEINHEIT")
                    .HasMany<Person>(o => o.Members)
                        .WithOne(p => p.OrgUnit);
            modelBuilder
                .Entity<OrgUnit>()
                .ToTable("V_ORGEINHEIT")
                    .HasOne<Person>(o => o.HeadOfOrgUnit)
                        .WithMany(p => p.OwnedOrgUnits)
                        .HasForeignKey(o => o.HeadOfOrgUnitId);
            modelBuilder
                .Entity<OrgUnit>()
                .ToTable("V_ORGEINHEIT")
                    .HasMany<OrgUnitToFunction>(o => o.OrgUnitToFunctions)
                        .WithOne(p => p.OrgUnit)
                        .HasForeignKey(s => s.OrgUnitId);

            // Persons
            modelBuilder
                .Entity<Person>()
                .ToTable("V_PERSON")
                    .HasOne<OrgUnit>(p => p.OrgUnit)
                        .WithMany(o => o.Members)
                        .HasForeignKey(p => p.OrgUnitId);
            modelBuilder
                .Entity<Person>()
                .ToTable("V_PERSON")
                    .HasOne<Room>(p => p.Room)
                        .WithMany(r => r.Members)
                        .HasForeignKey(p => p.RoomId);
            modelBuilder
                .Entity<Person>()
                .ToTable("V_PERSON")
                    .HasOne<Status>(p => p.Status)
                        .WithMany(s => s.Peoples)
                        .HasForeignKey(p => p.StatusId);
            modelBuilder
                .Entity<Person>()
                .ToTable("V_PERSON")
                    .HasOne<Function>(p => p.Function)
                        .WithMany(f => f.Peoples)
                        .HasForeignKey(p => p.FunctionId);
            modelBuilder
                .Entity<Person>()
                .ToTable("V_PERSON")
                    .HasMany<OrgUnitToFunction>(p => p.OrgUnitFunctions)
                        .WithOne(f => f.Person)
                        .HasForeignKey(s => s.PersonId);

            // Status
            modelBuilder
                .Entity<Status>()
                .ToTable("V_PERSON_STATUS")
                    .HasMany<Person>(s => s.Peoples)
                        .WithOne(p => p.Status);

            // Function
            modelBuilder
                .Entity<Function>()
                .ToTable("V_FUNKTIONEN")
                    .HasMany<Person>(s => s.Peoples)
                        .WithOne(p => p.Function);
            modelBuilder
                .Entity<Function>()
                .ToTable("V_FUNKTIONEN")
                    .HasMany<OrgUnitToFunction>(s => s.OrgUnitToFunctions)
                        .WithOne(p => p.Function)
                        .HasForeignKey(s => s.FunctionId);


            // OrgUnitToFunction
            modelBuilder
                .Entity<OrgUnitToFunction>()
                .HasKey(d => new { d.PersonId, d.OrgUnitId, d.FunctionId });

            modelBuilder
                .Entity<OrgUnitToFunction>()
                .ToTable("V_PERSON_ROLLE")
                    .HasOne<Person>(o => o.Person)
                        .WithMany(p => p.OrgUnitFunctions)
                        .HasForeignKey(o => o.PersonId);
            modelBuilder
                .Entity<OrgUnitToFunction>()
                .ToTable("V_PERSON_ROLLE")
                    .HasOne<OrgUnit>(o => o.OrgUnit)
                        .WithMany(o => o.OrgUnitToFunctions)
                        .HasForeignKey(o => o.OrgUnitId);
            modelBuilder
                .Entity<OrgUnitToFunction>()
                .ToTable("V_PERSON_ROLLE")
                    .HasOne<Function>(o => o.Function)
                        .WithMany(o => o.OrgUnitToFunctions)
                        .HasForeignKey(o => o.FunctionId);
        }

        public DbSet<Location> Locations { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Floor> Floors { get; set; }
        public DbSet<BuildingPart> BuildingParts { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<OrgUnit> OrgUnits { get; set; }
        public DbSet<Person> Peoples { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Function> Functions { get; set; }
        public DbSet<OrgUnitToFunction> OrgUnitToFunction { get; set; }
    }
}
