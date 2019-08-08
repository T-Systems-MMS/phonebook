using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;

namespace Phonebook.Source.PeopleSoft.Services
{
    public interface IDataService : IDisposable
    {
        OracleConnection Connection { get; }
        OracleCommand CreateEmptyCommand();
        IEnumerable<IEnumerable<string>> runCommand(OracleCommand command);
        IEnumerable<IEnumerable<string>> runCommand(string textCommand);
    }
}