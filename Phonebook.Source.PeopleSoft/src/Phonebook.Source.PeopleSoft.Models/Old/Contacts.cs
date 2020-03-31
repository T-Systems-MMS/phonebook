using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models.Old {
  public class Contacts {
    private readonly Models.Person person;

    public Contacts(Models.Person person) { this.person = person; }
    public string Mobile {
      get {
        return person.MobilPhone == null ? string.Empty : person.MobilPhone;
      }
    }
    public string Fax {
      get { return person.FAX == null ? string.Empty : person.FAX; }
    }
    public string Email {
      get { return person.EMail == null ? string.Empty : person.EMail; }
    }
    public string Phone {
      get { return person.Phone == null ? string.Empty : person.Phone; }
    }
    public Messenger Messenger {
      get { return null; }
    }
  }
}
