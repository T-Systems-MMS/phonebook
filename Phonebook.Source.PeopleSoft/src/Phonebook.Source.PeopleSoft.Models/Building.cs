using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Phonebook.Source.PeopleSoft.Models {
  public class Building {
    [Column(name
            : "ID")]
    public int Id {
      get;
      set;
    }
    [Column(name
            : "STANDORT_ID")]
    public int LocationId {
      get;
      set;
    }
    public virtual Location? Location {
      get;
      set;
    }
    [Column(name
            : "KURZBEZEICHNUNG")]
    public string? ShortName {
      get;
      set;
    }
    [Column(name
            : "NAME_LANG")]
    public string? Address {
      get;
      set;
    }
    [Column(name
            : "NAME")]
    public string? Name {
      get;
      set;
    }
    [Column(name
            : "Nummer")]
    public string? Number {
      get;
      set;
    }
    public virtual IEnumerable<Floor>? Floors {
      get;
      set;
    }
    public virtual IEnumerable<BuildingPart>? BuildingParts {
      get;
      set;
    }
  }
}
