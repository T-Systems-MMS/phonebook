using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models.Old {
  public class Person {
    private readonly Models.Person person;

    public Person(Models.Person person) {
      this.person = person;
      this.BuildOldPerson();
    }

    private void BuildOldPerson() {
      Type = new PersonStatus(person.Status).ToString();
      Id = person.ShortName;
      Firstname = person.FirstName;
      Surname = person.LastName;
      Title = person.Title;
      Role = person.Function != null ? person.Function.Label : string.Empty;
      Picture = false;
      Contacts = new Contacts(person);
      if (person.OrgUnit.HeadOfOrgUnitId == person.Id) {
        Role = $"Leiter {person.OrgUnit.Name}";
        Business = new Business(person.OrgUnit, true);
      } else {
        Business = new Business(person.OrgUnit);
      }

      Location = new Location(person);
    }

    public string Type {
      get;
      private set;
    }
    public string Id {
      get;
      private set;
    }
    public string Firstname {
      get;
      private set;
    }
    public string Surname {
      get;
      private set;
    }
    public string Title {
      get;
      private set;
    }
    public string Role {
      get;
      private set;
    }
    public bool Picture {
      get;
      private set;
    }
    public Contacts Contacts {
      get;
      private set;
    }
    public Location Location {
      get;
      private set;
    }
    public Business Business {
      get;
      private set;
    }
  }
}
