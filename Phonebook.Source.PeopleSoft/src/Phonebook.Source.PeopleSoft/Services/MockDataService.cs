using System;
using System.Collections.Generic;
using Oracle.ManagedDataAccess.Client;

namespace Phonebook.Source.PeopleSoft.Services
{
    public class MockDataService : IDataService
    {
        private readonly OracleConnection connection;

        public OracleConnection Connection => connection;

        public MockDataService()
        {
            connection = new OracleConnection();
        }

        public OracleCommand CreateEmptyCommand()
        {
            return connection.CreateCommand();
        }
        public IEnumerable<IEnumerable<string>> runCommand(OracleCommand command)
        {
            Console.WriteLine($"try to send the command: {command.ToString()}; {command.CommandText}");
            yield break;
        }

        public IEnumerable<IEnumerable<string>> runCommand(string textCommand)
        {
            var command = connection.CreateCommand();
            command.CommandText = textCommand;
            return runCommand(command);
        }

        public void Dispose()
        {
            connection.Close();
            connection.Dispose();
        }

    }
}