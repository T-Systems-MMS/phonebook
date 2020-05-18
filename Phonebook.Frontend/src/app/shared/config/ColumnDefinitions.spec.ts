import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { mockPerson } from 'src/app/shared/mocks/person';
import {
  Business,
  City,
  Contacts,
  Location,
  Messenger,
  Person,
  PersonStatus,
  PhonebookSortDirection,
  Room,
} from 'src/app/shared/models';

const personA = new Person(
  PersonStatus.Interner_Lernender,
  'aaaa',
  'Abc',
  'Abc',
  'A',
  'Abc efg',
  false,
  new Contacts('', '', '', '', new Messenger('', 0)),
  new Location(new City('', '', ''), [new Room('', '', 0, '', '', '', '', '', '')]),
  new Business(null, [], [], [], [], [], [], '')
);

const personB = new Person(
  PersonStatus.Interner_Lernender,
  'xxxx',
  'xyz',
  'xyz',
  'Z',
  'Xyz uvw',
  false,
  new Contacts('', '', '', '', new Messenger('', 0)),
  new Location(new City('', '', ''), [new Room('', '', 0, '', '', '', '', '', '')]),
  new Business(null, [], [], [], [], [], [], '')
);

describe('Column Filter Functions: ', () => {
  it('Picture', () => {
    expect(ColumnDefinitions.picture.filterFunction(/PF OS/i, mockPerson)).toBe(false);
  });

  it('id', () => {
    expect(ColumnDefinitions.id.filterFunction(/MXMS/i, mockPerson)).toBe(true);
    expect(ColumnDefinitions.id.filterFunction(/AAAA/i, mockPerson)).toBe(false);
  });

  it('fullname', () => {
    expect(ColumnDefinitions.fullname.filterFunction(/Dr\. Max Mustermann/i, mockPerson)).toBe(
      true
    );
    expect(ColumnDefinitions.fullname.filterFunction(/Max Mustermann/i, mockPerson)).toBe(true);
    expect(ColumnDefinitions.fullname.filterFunction(/Mustermann Max/i, mockPerson)).toBe(true);
    expect(ColumnDefinitions.fullname.filterFunction(/Max/i, mockPerson)).toBe(true);
    expect(ColumnDefinitions.fullname.filterFunction(/Mustermann/i, mockPerson)).toBe(true);
    expect(ColumnDefinitions.fullname.filterFunction(/Nichtswaspasst/i, mockPerson)).toBe(false);
  });

  it('email', () => {
    expect(ColumnDefinitions.email.filterFunction(/Max.Mustermann@example.com/i, mockPerson)).toBe(
      true
    );
  });

  it('phone', () => {
    expect(ColumnDefinitions.phone.filterFunction(/\+4935128200000/i, mockPerson)).toBe(true);
  });

  it('Organization Unit', () => {
    expect(ColumnDefinitions.orgUnit.filterFunction(/AB CD/i, mockPerson)).toBe(true);
  });
});

describe('Column Sort Functions: ', () => {
  it('fullname', () => {
    expect(
      ColumnDefinitions.fullname.sortFunction(personA, personB, PhonebookSortDirection.asc)
    ).toBeLessThan(0);
  });
});
