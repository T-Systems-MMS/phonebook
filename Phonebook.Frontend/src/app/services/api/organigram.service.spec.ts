import { inject, TestBed, getTestBed } from '@angular/core/testing';
import { OrganigramService, UnitTreeNode } from './organigram.service';
import { PersonService } from './person.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Person, PersonStatus, Contacts, Messenger, City, Business } from 'src/app/shared/models';

describe('OrganigramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrganigramService, { provide: PersonService, useValue: null }],
    });
  });
  it('should be created', inject([OrganigramService], (service: OrganigramService) => {
    expect(service).toBeTruthy();
  }));
  it('should return users OrgUnit', inject([OrganigramService], (service: OrganigramService) => {
    const user: Person = {
      Type: PersonStatus.Interner_Mitarbeiter,
      Id: '9305',
      Firstname: 'Coy',
      Surname: 'Abbott',
      Title: 'Prof.',
      Role: 'head of',
      Picture: false,
      Contacts: {
        Mobile: '(932) 318-4833',
        Fax: '(640) 504-4249',
        Email: 'Elbert.Stiedemann95@hotmail.com',
        Phone: '1-539-650-4239',
        Messenger: null,
      },
      Location: {
        ContactPerson: null,
        LinkRoutingWebsite: null,
        ReceptionFax: null,
        Description: null,
        ReceptionPhone: null,
        LinkPicture: null,
        LinkRoutingInfo: null,
        City: {
          Name: 'Pfannerstillmouth',
          Building: 'Willms Burgs',
          ZipCode: '2435 Erdman Fords, South Ebbaborough, New Zealand',
        },
        RoomCollection: [
          {
            Building: 'Willms Burgs 881',
            BuildingId: '10',
            Floor: 14,
            Description: '57254 Rickey Burg, Calliestad, Aruba',
            Phone: '',
            Number: 'Apl',
            Id: '162',
            Place: 'Langton',
            FloorPlan: 'sample_static',
          },
        ],
      },
      Business: {
        ShortBusinessunitTeamassistent: [],
        ShortSupervisor: ['1999'],
        ShortOrgUnit: ['42'],
        OrgUnit: ['Sports & Kids'],
        BusinessunitTeamassistent: [],
        Supervisor: ['Berneice Goldner'],
        Costcenter: '0195',
      },
      isLearner(): boolean {
        return (
          this.Type === PersonStatus.Interner_Lernender ||
          this.Type === PersonStatus.Externer_Lernender
        );
      },
      isSupervisor(): boolean {
        return this.Role.indexOf('Leiter') >= 0;
      },
      isAssistent() {
        return this.Role.indexOf('Management & Team Support') >= 0;
      },
      isOfStatus(status: PersonStatus) {
        return this.Type === status;
      },
    };
    const organigram: UnitTreeNode[] = [
      {
        id: 'SK',
        name: 'Sports & Kids',
        depth: 0,
        children: [],
        supervisors: [],
        assistents: [],
        employees: [],
        learners: [],
      },
    ];

    expect(service.getNodeForUser(user, organigram, 0).name).toEqual('Sports & Kids');
  }));
});
