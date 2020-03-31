using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Phonebook.Source.PeopleSoft.Models {
  public class Location {
    [Column(name
            : "ID")]
    public int Id {
      get;
      set;
    }
    [Column(name
            : "LAND")]
    public string Country {
      get;
      set;
    }
    [Column(name
            : "NAME")]
    public string Name {
      get;
      set;
    }
    [Column(name
            : "KURZBEZEICHNUNG")]
    public string? ShortName {
      get;
      set;
    }
    public virtual IEnumerable<Building>Buildings {
      get;
      set;
    }
  }
}
