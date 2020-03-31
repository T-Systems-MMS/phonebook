using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Phonebook.Source.PeopleSoft.Models
{
public class Room
{
    [Column(name:"ID")]
    public int Id {
        get;
        set;
    }
    [Column(name: "NUMMER")]
    public string? Number {
        get;
        set;
    }
    [Column(name: "ETAGE_ID")]
    public int? FloorId {
        get;
        set;
    }
    public Floor? Floor {
        get;
        set;
    }
    [Column(name: "GEBAEUDETEIL_ID")]
    public int? BuildingPartId {
        get;
        set;
    }
    public virtual BuildingPart? BuildingPart {
        get;
        set;
    }
    [Column(name: "RAUMPLAN")]
    public string? Map {
        get;
        set;
    }
    public virtual IEnumerable<Person>? Members {
        get;
        set;
    }
}
}
