using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Phonebook.Source.PeopleSoft.Models
{
    public partial class ModelContext : DbContext
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
            modelBuilder
                .Query<Location>()
                .ToView("V_STANDORT");
            modelBuilder
                .Query<Building>()
                .ToView("V_GEBAEUDE");
            // This isn't working currently...
            //.HasOne(b => b.Location)
            //.WithMany(l => l.Buildings)
            //.HasForeignKey(d => d.LocationId);
            modelBuilder
                .Query<Floor>()
                .ToView("V_ETAGE");
                    //.HasOne<Building>()
                    //.WithMany()
                    //.HasForeignKey(d => d.BuildingId);
            modelBuilder
                .Query<BuildingPart>()
                .ToView("V_GEBAEUDETEIL");
                    //.HasOne<Building>()
                    //.WithMany()
                    //.HasForeignKey(d => d.BuildingId);
            modelBuilder
                .Query<Room>()
                .ToView("V_RAUM");
                    //.HasOne<BuildingPart>()
                    //.WithMany()
                    //.HasForeignKey(d => d.BuildingPartId);
            modelBuilder
                .Query<OrgUnit>()
                .ToView("V_ORGEINHEIT");
                    //.HasOne<OrgUnit>()
                    //.WithMany()
                    //.HasForeignKey(d => d.ParentId);
            modelBuilder
                .Query<Person>()
                .ToView("V_PERSON");
                    //.HasOne<OrgUnit>()
                    //    .WithMany()
                    //    .HasForeignKey(d => d.OrgUnitId)
                    //.HasOne<Room>()
                    //    .WithMany()
                    //    .HasForeignKey(d => d.RoomId);
        }

        public DbQuery<Location> Locations { get; set; }
        public DbQuery<Building> Buildings { get; set; }
        public DbQuery<Floor> Floors { get; set; }
        public DbQuery<BuildingPart> BuildingParts { get; set; }
        public DbQuery<Room> Rooms { get; set; }
        public DbQuery<OrgUnit> OrgUnits { get; set; }
        public DbQuery<Person> Peoples { get; set; }
    }
}
