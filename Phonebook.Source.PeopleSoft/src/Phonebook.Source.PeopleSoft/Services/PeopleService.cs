using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using Oracle.ManagedDataAccess.Client;

namespace Phonebook.Source.PeopleSoft.Services
{
    public class PeopleService
    {
        private static readonly string selectString = $"Select {GetSelectFields().Select(f => f.Item1).Aggregate((a, b) => a + "," + b)} From People";
        private Func<string, OracleCommand, OracleCommand> SearchPerson = (searchText, command) =>
        {
            var fields = GetSelectFields().Select(f => f.Item1).ToList();
            var sqlQuery = selectString;
            sqlQuery += " Where ";
            var searchParameterName = "searchText";
            foreach (var field in fields)
            {
                sqlQuery += $"{field} like '@{searchParameterName}' OR";
            }
            // Add an allways false parameter because our query and with OR or Where
            sqlQuery += "0 == 1";
            command.CommandText = sqlQuery;
            var searchParameter = command.CreateParameter();
            searchParameter.ParameterName = searchParameterName;
            searchParameter.Value = searchText;
            return command;
        };

        public PeopleService(IDataService dataService)
        {
            DataService = dataService;
        }

        public IDataService DataService { get; }

        public IEnumerable<People> GetPeoples(string searchText)
        {
            var command = SearchPerson(searchText, DataService.CreateEmptyCommand());
            var results = DataService.runCommand(command);
            var fields = GetSelectFields().Select(d => d.Item2);
            return results.Select(row =>
            {
                var result = new People();
                for (int i = 0; i < fields.Count(); i++)
                {
                    var field = fields.ElementAt(i);
                    // TODO: try to convert to the property type.
                    field.SetValue(result, row.ElementAt(i));
                }
                return result;
            });
        }
        public IEnumerable<People> GetPeoples()
        {
            var peopleCommand = DataService.CreateEmptyCommand();
            peopleCommand.CommandText = selectString;
            return ConvertOracleResultToPeople(DataService.runCommand(peopleCommand), GetSelectFields());
        }

        private static IEnumerable<People> ConvertOracleResultToPeople(IEnumerable<IEnumerable<string>> oracleResult, IEnumerable<Tuple<string, PropertyInfo>> fields){
            var fieldPropertyInfos = fields.Select(d => d.Item2);
            return oracleResult.Select(row =>
            {
                var result = new People();
                for (int i = 0; i < fieldPropertyInfos.Count(); i++)
                {
                    var fieldPropertyInfo = fieldPropertyInfos.ElementAt(i);
                    // TODO: try to convert to the property type.
                    fieldPropertyInfo.SetValue(result, row.ElementAt(i));
                }
                return result;
            });
        }

        private static IEnumerable<Tuple<string, PropertyInfo>> GetSelectFields()
        {
            return typeof(People).GetProperties()
                // Remove all fields that marked as not relevant
                .Where(p =>
                {
                    var attributes = p.GetCustomAttributes(false);
                    return !attributes.Any(a => a is NotMappedAttribute);
                })
                // Select the column name from the attribute
                .Select(p =>
                {
                    ColumnAttribute columnAttribute = p.GetCustomAttributes(false).First(d => d is ColumnAttribute) as ColumnAttribute;
                    return new Tuple<string, PropertyInfo>(columnAttribute.Name, p);
                });
        }

        public class People
        {
            /// This is the organization person "Kürzel" like axax
            [Column("Kürzel")]
            public string Id { get; set; }
            [Column("Vorname")]
            public string FristName { get; set; }
            [Column("Nachname")]
            public string LastName { get; set; }
            [Column("Title")]
            public string Name { get; set; }
            [Column("TelefonNR")]
            public string Phone { get; set; }
            [Column("Fax")]
            public string Fax { get; set; }
            [Column("Mobil")]
            public string Mobil { get; set; }
            [Column("Taetigkeit")]
            [NotMapped] // TODO: remove me if we know how to query lookups
            public string Position { get; set; }
            [Column("Email")]
            public string EMail { get; set; }
            //[Column("Anstellung")]            
            [Column("Raum")]
            [NotMapped] // TODO: remove me if we know how to query lookups
            public string Room { get; set; }
            [Column("Org Einheit")]
            [NotMapped] // TODO: remove me if we know how to query lookups
            public string Department { get; set; }
        }
    }
}