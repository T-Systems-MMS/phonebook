using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security;

namespace Phonebook.Source.PeopleSoft.Models
{
public class Status
{
    [Column(name: "ID")]
    public int Id {
        get;
        set;
    }
    [Column(name: "NAME")]
    public string Name {
        get;
        set;
    }
    [Column(name: "CODE")]
    public string? Code {
        get;
        set;
    }
    public virtual IEnumerable<Person>? Peoples {
        get;
        set;
    }

}
}