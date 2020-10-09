using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Phonebook.Source.PeopleSoft.Repositories
{
    public interface IRepository<T> where T: class
    {
        Task<IEnumerable<T>> Get();
        Task<T> Get(int id);

    }
}
