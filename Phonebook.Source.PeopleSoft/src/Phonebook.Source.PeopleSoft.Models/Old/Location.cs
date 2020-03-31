using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models.Old {
  public class Location {
    private readonly Models.Person person;

    public Location(Models.Person person) {
      this.person = person;
      this.BuildOldLocation();
    }

    private void BuildOldLocation() {
      City = new City(person.Room);
      RoomCollection = new List<Room>(){new Room(person.Room)};
    }

    public dynamic ContactPerson {
      get { return null; }
    }
    public dynamic LinkRoutingWebsite {
      get { return null; }
    }
    public dynamic ReceptionFax {
      get { return null; }
    }
    public dynamic Description {
      get { return null; }
    }
    public dynamic ReceptionPhone {
      get { return null; }
    }
    public dynamic LinkPicture {
      get { return null; }
    }
    public dynamic LinkRoutingInfo {
      get { return null; }
    }
    public City City {
      get;
      private set;
    }
    public IEnumerable<Room>RoomCollection {
      get;
      private set;
    }
  }
}
