import { TableLogic } from './table-logic';
import {
  PhonebookSortDirection,
  PersonType,
  Contacts,
  Location,
  City,
  Business,
  Messenger
} from 'src/app/shared/models';
import { Person } from 'src/app/shared/models';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';

describe('Table Logic - Sort', () => {
  it('"Axel" before "Zarathustra"', () => {
    const unsortedPersonsArray: Person[] = [
      new Person(
        PersonType.Interner_Mitarbeiter,
        '',
        'Zarathustra',
        '',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      ),
      new Person(
        PersonType.Interner_Mitarbeiter,
        '',
        'Axel',
        '',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      )
    ];
    expect(
      TableLogic.sort(unsortedPersonsArray, {
        column: ColumnDefinitions.fullname,
        direction: PhonebookSortDirection.asc
      })
    ).toEqual([
      new Person(
        PersonType.Interner_Mitarbeiter,
        '',
        'Axel',
        '',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      ),
      new Person(
        PersonType.Interner_Mitarbeiter,
        '',
        'Zarathustra',
        '',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      )
    ]);
  });
  it('"Zarathustra" before "Axel"', () => {
    const unsortedPersonsArray: Person[] = [
      new Person(
        PersonType.Interner_Mitarbeiter,
        '',
        'Axel',
        '',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      ),
      new Person(
        PersonType.Interner_Mitarbeiter,
        '',
        'Zarathustra',
        '',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      )
    ];

    expect(
      TableLogic.sort(unsortedPersonsArray, {
        column: ColumnDefinitions.fullname,
        direction: PhonebookSortDirection.desc
      })
    ).toEqual([
      new Person(
        PersonType.Interner_Mitarbeiter,
        '',
        'Zarathustra',
        '',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      ),
      new Person(
        PersonType.Interner_Mitarbeiter,
        '',
        'Axel',
        '',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      )
    ]);
  });
});
