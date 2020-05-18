import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable } from 'rxjs';
import { map, publishReplay } from 'rxjs/operators';
import { TableLogic } from 'src/app/modules/table/table-logic';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import {
  Business,
  Contacts,
  Location,
  Messenger,
  Person,
  PhonebookSortDirection,
  Room,
} from 'src/app/shared/models';

@Injectable()
export class PersonService {
  constructor(private http: HttpClient) {}

  private allPersonObservable: Observable<Person[]> | null = null;

  /**
   * This is necessary, because MyList is only an Array of Objects but not an Array of Persons
   * (Javascript can be pretty bad... Why do we have Typesafety altogether if you can Map Objects to classes?)
   */
  private generateRealPersonArray(persons: Person[]): Person[] {
    return persons.map((item) => {
      return new Person(
        item.Type,
        item.Id,
        item.Firstname,
        item.Surname,
        item.Title,
        item.Role,
        item.Picture,
        new Contacts(
          item.Contacts.Mobile,
          item.Contacts.Fax,
          item.Contacts.Email,
          item.Contacts.Phone,
          new Messenger('', null)
        ),
        new Location(
          item.Location.City,
          item.Location.RoomCollection.map((room) => {
            return new Room(
              room.Building,
              room.BuildingId,
              room.Floor,
              room.Description,
              room.Phone,
              room.Number,
              room.Id,
              room.Place,
              room.FloorPlan
            );
          }),
          item.Location.ContactPerson,
          item.Location.LinkRoutingWebsite,
          item.Location.ReceptionFax,
          item.Location.Description,
          item.Location.ReceptionPhone,
          item.Location.LinkPicture,
          item.Location.LinkRoutingInfo
        ),
        new Business(
          item.Business.Id,
          item.Business.ShortBusinessunitTeamassistent,
          item.Business.ShortSupervisor,
          item.Business.ShortOrgUnit,
          item.Business.OrgUnit,
          item.Business.BusinessunitTeamassistent,
          item.Business.Supervisor,
          item.Business.Costcenter
        )
      );
    });
  }

  public getAll(): Observable<Person[]> {
    if (this.allPersonObservable != null) {
      return this.allPersonObservable;
    }

    const observable = this.http.get<Person[]>('/api/people').pipe(
      map((personArray) => {
        return TableLogic.sort(this.generateRealPersonArray(personArray), {
          column: ColumnDefinitions.fullname,
          direction: PhonebookSortDirection.asc,
        });
      }),
      publishReplay()
    );
    (observable as ConnectableObservable<Person[]>).connect();
    this.allPersonObservable = observable;
    return this.allPersonObservable;
  }

  public getById(id: string): Observable<Person | null> {
    return this.getAll().pipe(
      map((personArray) => {
        const person = personArray.find((x) => {
          return x.Id === id.toUpperCase();
        });
        if (person === undefined) {
          return null;
        }
        return person;
      })
    );
  }

  public getByOrgUnit(name: string): Observable<Person[]> {
    return this.getAll().pipe(
      map((personArray) => {
        return personArray.filter((p) => {
          var personOrgUnit = p.Business.ShortOrgUnit[p.Business.ShortOrgUnit.length - 1];
          return personOrgUnit == name;
        });
      })
    );
  }

  public getPersonsByRoom(roomId: string): Observable<Person[]> {
    return this.getAll().pipe(
      map((personArray) => {
        return personArray.filter((x) => {
          return x.Location.RoomCollection.some((x) => x.Number == roomId);
        });
      })
    );
  }
}
