import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { Business, City, Contacts, Location, Messenger, Person, PersonStatus, PhonebookSortDirection } from 'src/app/shared/models';
import { TableLogic } from './table-logic';

describe('Table Logic - Sort', () => {
  it('"Axel" before "Zarathustra"', () => {
    const unsortedPersonsArray: Person[] = [
      new Person(
        PersonStatus.Interner_Mitarbeiter,
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
        PersonStatus.Interner_Mitarbeiter,
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
        PersonStatus.Interner_Mitarbeiter,
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
        PersonStatus.Interner_Mitarbeiter,
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
        PersonStatus.Interner_Mitarbeiter,
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
        PersonStatus.Interner_Mitarbeiter,
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
        PersonStatus.Interner_Mitarbeiter,
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
        PersonStatus.Interner_Mitarbeiter,
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

describe('Table Logic - Filter', () => {
  it('Find "Mustermann"', () => {
    const unsortedPersonsArray: Person[] = [
      new Person(
        PersonStatus.Interner_Mitarbeiter,
        '',
        'Mustermann',
        'Max',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      )
    ];
    expect(TableLogic.filter(unsortedPersonsArray, 'Mustermann', [ColumnDefinitions.fullname])).toEqual([
      new Person(
        PersonStatus.Interner_Mitarbeiter,
        '',
        'Mustermann',
        'Max',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      )
    ]);
  });

  it('NOT find "Otherman"', () => {
    const unsortedPersonsArray: Person[] = [
      new Person(
        PersonStatus.Interner_Mitarbeiter,
        '',
        'Mustermann',
        'Max',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      )
    ];
    expect(TableLogic.filter(unsortedPersonsArray, 'Otherman', [ColumnDefinitions.fullname])).toEqual([]);
  });

  it('Find Person with Diarectics', () => {
    const unsortedPersonsArray: Person[] = [
      new Person(
        PersonStatus.Interner_Mitarbeiter,
        '',
        'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖòóôõöÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž',
        'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖòóôõöÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž',
        '',
        '',
        false,
        new Contacts('', '', '', '', new Messenger('', 0)),
        new Location(new City('', ''), []),
        new Business([], [], [], [], [], [], '')
      )
    ];
    expect(
      TableLogic.filter(unsortedPersonsArray, 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖòóôõöÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž', [
        ColumnDefinitions.fullname
      ])
    ).toEqual([
      new Person(
        PersonStatus.Interner_Mitarbeiter,
        '',
        'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖòóôõöÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž',
        'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖòóôõöÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž',
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
