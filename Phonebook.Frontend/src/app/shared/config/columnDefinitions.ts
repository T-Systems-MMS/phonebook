import { Helpers } from 'src/app/modules/table/helpers';
import { Person } from 'src/app/shared/models/classes/Person';
import { PhonebookSortDirection } from 'src/app/shared/models/enumerables';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';
import { Column } from 'src/app/shared/models/interfaces';

export const ColumnDefinitions: {
  picture: Readonly<Column>;
  id: Readonly<Column>;
  fullname: Readonly<Column>;
  email: Readonly<Column>;
  phone: Readonly<Column>;
  mobile: Readonly<Column>;
  role: Readonly<Column>;
  city: Readonly<Column>;
  orgUnit: Readonly<Column>;
  room: Readonly<Column>;
  building: Readonly<Column>;
  costcenter: Readonly<Column>;
  status: Readonly<Column>;
  getAll(): Readonly<Column>[];
  getDefault(): Readonly<Column>[];
  getAllFilterableColumns(): Readonly<Column>[];
  getAllSortableColumns(): Readonly<Column>[];
  getAllFullMatchFilterableColumns(): Readonly<Column>[];
  getColumnById(columnId: string): Readonly<Column> | undefined;
} = {
  picture: {
    id: ColumnId.picture,
    title: $localize`:TableComponent|Title of Table Column "Picture"@@ColumnTitlePicture:Picture`,
    rank: 0,
    filterable: false,
    sortable: false,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      return false;
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return 0;
    }
  },
  id: {
    id: ColumnId.id,
    title: $localize`:TableComponent|Title of Table Column "Id"@@ColumnTitleId:Id`,
    rank: 100,
    filterable: true,
    sortable: true,
    fullMatchFilter: true,
    filterFunction: (filterString: RegExp, person: Person) => {
      return filterString.test(person.Id);
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return Helpers.stringCompare(a.Id, b.Id) * Helpers.sortDirection(sortDirection);
    }
  },
  fullname: {
    id: ColumnId.fullname,
    title: $localize`:TableComponent|Title of Table Column "Name"@@ColumnTitleFullName:Name`,
    rank: 50,
    filterable: true,
    sortable: true,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      return (
        filterString.test(
          person.Title + ' ' + Helpers.removeAccents(person.Firstname) + ' ' + Helpers.removeAccents(person.Surname)
        ) || filterString.test(Helpers.removeAccents(person.Surname) + ' ' + Helpers.removeAccents(person.Firstname))
      );
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      const x = Helpers.stringCompare(a.Surname, b.Surname) * Helpers.sortDirection(sortDirection);
      if (x === 0) {
        return Helpers.stringCompare(a.Firstname, b.Firstname) * Helpers.sortDirection(sortDirection);
      }
      return x;
    }
  },
  email: {
    id: ColumnId.email,
    title: $localize`:TableComponent|Title of Table Column "Email"@@ColumnEmailName:Email`,
    rank: 30,
    filterable: true,
    sortable: false,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      return filterString.test(person.Contacts.Email);
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return Helpers.stringCompare(a.Contacts.Email, b.Contacts.Email) * Helpers.sortDirection(sortDirection);
    }
  },
  phone: {
    id: ColumnId.phone,
    title: $localize`:TableComponent|Title of Table Column "Phone"@@ColumnTitlePhone:Phone`,
    rank: 1,
    filterable: true,
    sortable: true,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      if (filterString.source.length >= 4) {
        if (filterString.test(person.Contacts.Phone.replace(/\s/, ''))) {
          return true;
        }
      }
      return false;
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return Helpers.phoneNumberCompare(a.Contacts.Phone, b.Contacts.Phone) * Helpers.sortDirection(sortDirection);
    }
  },
  mobile: {
    id: ColumnId.mobile,
    title: $localize`:TableComponent|Title of Table Column "Mobile"@@ColumnTitleMobile:Mobile`,
    rank: 1,
    filterable: true,
    sortable: true,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      if (filterString.source.length >= 4) {
        if (filterString.test(person.Contacts.Mobile.replace(/\s/, ''))) {
          return true;
        }
      }
      return false;
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return Helpers.phoneNumberCompare(a.Contacts.Mobile, b.Contacts.Mobile) * Helpers.sortDirection(sortDirection);
    }
  },
  role: {
    id: ColumnId.role,
    title: $localize`:TableComponent|Title of Table Column "Role"@@ColumnTitleRole:Role`,
    rank: 10,
    filterable: true,
    sortable: true,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      return filterString.test(Helpers.removeAccents(person.Role));
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return Helpers.stringCompare(a.Role, b.Role) * Helpers.sortDirection(sortDirection);
    }
  },
  city: {
    id: ColumnId.city,
    title: $localize`:TableComponent|Title of Table Column "City"@@ColumnTitleCity:City`,
    rank: 10,
    filterable: true,
    sortable: true,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      return filterString.test(Helpers.removeAccents(person.Location.City.Name));
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return Helpers.stringCompare(a.Location.City.Name, b.Location.City.Name) * Helpers.sortDirection(sortDirection);
    }
  },
  orgUnit: {
    id: ColumnId.orgUnit,
    title: $localize`:TableComponent|Title of Table Column "Organization Unit"@@ColumnTitleOrgUnit:Organization Unit`,
    rank: 10,
    filterable: true,
    sortable: true,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      // Searches for the Organization Unit Short Form, e.g. 'GB DB'
      for (let i = 0; i < person.Business.ShortOrgUnit.length; i++) {
        if (filterString.test(Helpers.removeAccents(person.Business.ShortOrgUnit[i]))) {
          return true;
        }
      }
      // Searches for the Organization Unit Long Form, e.g. 'Digital Business'
      for (let i = 0; i < person.Business.OrgUnit.length; i++) {
        if (filterString.test(Helpers.removeAccents(person.Business.OrgUnit[i]))) {
          return true;
        }
      }
      return false;
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return Helpers.stringArrayCompare(a.Business.ShortOrgUnit, b.Business.ShortOrgUnit, sortDirection);
    }
  },
  room: {
    id: ColumnId.room,
    title: $localize`:TableComponent|Title of Table Column "Room"@@ColumnTitleRoom:Room`,
    rank: 10,
    filterable: true,
    sortable: true,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      return (
        person.Location.RoomCollection[0].Number != null &&
        filterString.test(Helpers.removeAccents(person.Location.RoomCollection[0].Number))
      );
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return (
        Helpers.stringCompare(a.Location.RoomCollection[0].Number, b.Location.RoomCollection[0].Number) *
        Helpers.sortDirection(sortDirection)
      );
    }
  },
  building: {
    id: ColumnId.building,
    title: $localize`:TableComponent|Title of Table Column "Building"@@ColumnTitleBuilding:Building`,
    rank: 10,
    filterable: true,
    sortable: true,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      return (
        person.Location.RoomCollection[0].Building != null &&
        filterString.test(Helpers.removeAccents(person.Location.RoomCollection[0].Building))
      );
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return (
        Helpers.stringCompare(a.Location.RoomCollection[0].Building, b.Location.RoomCollection[0].Building) *
        Helpers.sortDirection(sortDirection)
      );
    }
  },
  costcenter: {
    id: ColumnId.costcenter,
    title: $localize`:TableComponent|Title of Table Column "Profitcenter" once Costcenter@@ColumnTitleCostcenter:Profitcenter`,
    rank: 10,
    filterable: true,
    sortable: true,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      return filterString.test(person.Business.Costcenter);
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return Helpers.stringCompare(a.Business.Costcenter, b.Business.Costcenter) * Helpers.sortDirection(sortDirection);
    }
  },
  status: {
    id: ColumnId.status,
    title: $localize`:TableComponent|Title of Table Column "Status"@@DataPersonStatus:Status`,
    rank: 10,
    filterable: true,
    sortable: true,
    fullMatchFilter: false,
    filterFunction: (filterString: RegExp, person: Person) => {
      return filterString.test(person.Type);
    },
    sortFunction: (a: Person, b: Person, sortDirection: PhonebookSortDirection) => {
      return Helpers.stringCompare(a.Type, b.Type) * Helpers.sortDirection(sortDirection);
    }
  },
  getAll: () => {
    return [
      ColumnDefinitions.picture,
      ColumnDefinitions.id,
      ColumnDefinitions.fullname,
      ColumnDefinitions.email,
      ColumnDefinitions.phone,
      ColumnDefinitions.mobile,
      ColumnDefinitions.role,
      ColumnDefinitions.city,
      ColumnDefinitions.orgUnit,
      ColumnDefinitions.room,
      ColumnDefinitions.building,
      ColumnDefinitions.costcenter,
      ColumnDefinitions.status
    ];
  },
  getDefault: () => {
    return [
      ColumnDefinitions.picture,
      ColumnDefinitions.id,
      ColumnDefinitions.fullname,
      ColumnDefinitions.email,
      ColumnDefinitions.phone,
      ColumnDefinitions.mobile,
      ColumnDefinitions.orgUnit,
      ColumnDefinitions.room,
      ColumnDefinitions.city,
      ColumnDefinitions.role
    ];
  },
  getAllFilterableColumns: () => {
    return ColumnDefinitions.getAll().filter(col => {
      return col.filterable === true;
    });
  },

  getAllSortableColumns: () => {
    return ColumnDefinitions.getAll().filter(col => {
      return col.sortable === true;
    });
  },

  getAllFullMatchFilterableColumns: () => {
    return ColumnDefinitions.getAll().filter(col => {
      return col.fullMatchFilter === true;
    });
  },
  /**
   * Returns the Column with the given Id, otherwise undefined.
   * @param columnId Id of the Column
   */
  getColumnById: (columnId: string): Column | undefined => {
    return ColumnDefinitions.getAll().find(col => {
      return col.id === columnId;
    });
  }
};

/**
 * Returns all an Array<string> with the id of the Columns
 */
export function getColumnsAsStringArray(columns: Column[]): ColumnId[] {
  return columns.map(col => {
    return col.id;
  });
}
