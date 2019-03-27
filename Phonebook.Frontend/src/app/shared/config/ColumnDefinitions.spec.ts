import { mockPerson } from 'src/app/shared/mocks/person';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import {
  Person,
  PersonType,
  Contacts,
  Messenger,
  Location,
  City,
  Room,
  Business,
  PhonebookSortDirection
} from 'src/app/shared/models';

const personA = new Person(
  PersonType.Interner_Lernender,
  'aaaa',
  'Abc',
  'Abc',
  'A',
  'Abc efg',
  false,
  new Contacts('', '', '', '', new Messenger('', 0)),
  new Location(new City('', '', ''), [new Room('', '', 0, '', '', '', '', '', '')]),
  new Business([], [], [], [], [], [], '')
);

const personB = new Person(
  PersonType.Interner_Lernender,
  'xxxx',
  'xyz',
  'xyz',
  'Z',
  'Xyz uvw',
  false,
  new Contacts('', '', '', '', new Messenger('', 0)),
  new Location(new City('', '', ''), [new Room('', '', 0, '', '', '', '', '', '')]),
  new Business([], [], [], [], [], [], '')
);

describe('Column Search and Filter Functions: ', () => {
  it('Organization Unit', () => {
    expect(ColumnDefinitions.orgUnit.filterFunction(new RegExp('PF OS'), mockPerson)).toBe(true);
  });

  it('fullname', () => {
    expect(ColumnDefinitions.fullname.sortFunction(personA, personB, PhonebookSortDirection.asc)).toBeLessThan(0);
  });
});
