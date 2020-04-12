using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Models.Old
{
    public class PersonStatus
    {
        private readonly Status status;

        public PersonStatus(Phonebook.Source.PeopleSoft.Models.Status status)
        {
            this.status = status;
        }
        public override string ToString()
        {
            return status.Name;
        }

    }
}
