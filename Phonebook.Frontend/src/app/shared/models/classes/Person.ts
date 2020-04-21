import { Room } from 'src/app/shared/models/classes/Room';
import { PersonStatus } from 'src/app/shared/models/enumerables/PersonStatus';
import { Business } from './Business';
import { City } from './City';
import { Contacts } from './Contacts';
import { Location } from './Location';
import { Messenger } from './Messenger';
/* tslint:disable:variable-name */

export class Person {
  public Type: PersonStatus;
  public Id: string;
  public Firstname: string;
  public Surname: string;
  public Title: string;
  public Role: string;
  public Picture: boolean;
  public Contacts: Contacts;
  public Location: Location;
  public Business: Business;
  constructor(
    type: PersonStatus,
    id: string,
    firstname: string,
    surname: string,
    title: string,
    role: string,
    picture: boolean,
    _Contacts: Contacts,
    _Location: Location,
    _Business: Business
  ) {
    this.Type = type;
    this.Id = id;
    this.Firstname = firstname;
    this.Surname = surname;
    this.Title = title;
    this.Role = role;
    this.Picture = picture;
    this.Contacts = _Contacts;
    this.Location = _Location;
    this.Business = _Business;
  }

  public isLearner(): boolean {
    return (
      this.Type === PersonStatus.Interner_Lernender || this.Type === PersonStatus.Externer_Lernender
    );
  }
  public isSupervisor(): boolean {
    return this.Role.indexOf('Leiter') >= 0;
  }
  public isAssistent() {
    return this.Role.indexOf('Management & Team Support') >= 0;
  }

  public isOfStatus(status: PersonStatus) {
    return this.Type === status;
  }

  public static empty(): Person {
    return new Person(
      PersonStatus.Interner_Mitarbeiter,
      '',
      '',
      '',
      '',
      '',
      false,
      new Contacts('', '', '', '', new Messenger('', 0)),
      new Location(new City('', ''), [new Room('', '', 0, '', '', '', '', '', '')]),
      new Business([], [], [], [], [], [], '')
    );
  }
}
