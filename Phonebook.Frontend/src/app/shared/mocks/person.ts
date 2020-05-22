import { Person, PersonStatus } from 'src/app/shared/models';

export const mockPerson: Person = new Person(
  PersonStatus.Externer_Lernender,
  'MXMS',
  'Max',
  'Mustermann',
  'Dr.',
  'Musterrolle',
  true,
  {
    Mobile: '+49150000000',
    Fax: '+49999999999',
    Email: 'Max.Mustermann@example.com',
    Phone: '+493512820 0000',
    Messenger: {
      Text: null,
      State: 0,
    },
  },
  {
    ContactPerson: null,
    LinkRoutingWebsite: null,
    ReceptionFax: null,
    Description: null,
    ReceptionPhone: null,
    LinkPicture: null,
    LinkRoutingInfo: null,
    City: {
      Name: 'Dresden',
      Building: 'Musterstraße 5',
    },
    RoomCollection: [
      {
        Building: 'Musterstraße 5',
        BuildingId: '31',
        Floor: 0,
        Description: 'Musterstadt, Musterstraße 5 Bauteil 1, Raum 503',
        Phone: '',
        Number: '503',
        Id: '1350',
        Place: 'Musterstadt',
        FloorPlan: 'Bauteil35',
      },
    ],
  },
  {
    Id: null,
    ShortBusinessunitTeamassistent: ['ABC'],
    ShortSupervisor: ['ABC'],
    ShortOrgUnit: ['AB_1', 'AD CD', 'AB CD'],
    OrgUnit: ['Corporate Unit 2', 'Business Unit', 'Other Unit'],
    BusinessunitTeamassistent: ['Max Mustermann'],
    Supervisor: ['Max Musterman'],
    Costcenter: '8040',
  }
);
