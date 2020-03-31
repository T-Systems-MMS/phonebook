using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models.Old {
  public class City {
    private readonly Phonebook.Source.PeopleSoft.Models.Room room;

    public City(Phonebook.Source.PeopleSoft.Models.Room room) {
      this.room = room;
    }
    public string Name {
      get {
        if (room == null) {
          return string.Empty;
        }
        if (room.BuildingPart != null) {
          return room.BuildingPart.Building.Location.Name;
        }
        if (room.Floor.Building != null) {
          return room.Floor.Building.Location.Name;
        }
        // TODO: add a warn!
        return string.Empty;
      }
    }
    public string Building {
      get {
        if (room == null) {
          return string.Empty;
        }
        if (room.BuildingPart != null) {
          return room.BuildingPart.Building.Name;
        }
        if (room.Floor != null) {
          return room.Floor.Building.Name;
        }
        // TODO: add a warn!
        return string.Empty;
      }
    }
    public string ZipCode {
      get {
        if (room == null) {
          return string.Empty;
        }
        var zipcodeString = string.Empty;
        if (room.BuildingPart != null) {
          zipcodeString = room.BuildingPart.Building.Address;
        } else if (room.Floor != null) {
          zipcodeString = room.Floor.Building.Address;
        }
        return Regex.Replace(zipcodeString, "(.*, )([0-9]*)( .*)", "$2");
      }
    }
  }
}
