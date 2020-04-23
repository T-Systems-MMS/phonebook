import { inject, TestBed } from '@angular/core/testing';
import { OrganigramService, UnitTreeNode } from './organigram.service';
import { PersonService } from './person.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Person, Business } from 'src/app/shared/models';

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

  const ORG_UNIT_ID: string = 'targetOrgUnit';
  const nodeOfUser: UnitTreeNode = {
    id: ORG_UNIT_ID,
    name: 'bla',
    depth: 0,
    children: [],
    supervisors: [],
    assistents: [],
    employees: [],
    learners: [],
  };
  it('should return users OrgUnit (first level)', inject(
    [OrganigramService],
    (service: OrganigramService) => {
      const user: Partial<Person> = {
        Business: {
          ShortOrgUnit: [ORG_UNIT_ID],
          OrgUnit: [ORG_UNIT_ID],
        } as Business,
      };

      const organigram: UnitTreeNode[] = [nodeOfUser];

      expect(service.getNodeForUser(user as Person, organigram, 0)).toEqual(nodeOfUser);
    }
  ));

  it('should return users OrgUnit (second level)', inject(
    [OrganigramService],
    (service: OrganigramService) => {
      const user: Partial<Person> = {
        Business: {
          ShortOrgUnit: ['firstLevel', ORG_UNIT_ID],
          OrgUnit: ['firstLevelName', ORG_UNIT_ID],
        } as Business,
      };
      const organigram: UnitTreeNode[] = [
        {
          id: 'firstLevel',
          name: 'firstLevelName',
          children: [{ ...nodeOfUser, depth: 1 }],
        } as UnitTreeNode,
      ];

      expect(service.getNodeForUser(user as Person, organigram, 0)).toEqual({
        ...nodeOfUser,
        depth: 1,
      });
    }
  ));

  it('should return users OrgUnit (third level)', inject(
    [OrganigramService],
    (service: OrganigramService) => {
      const user: Partial<Person> = {
        Business: {
          ShortOrgUnit: ['firstLevel', 'secondLevel', ORG_UNIT_ID],
          OrgUnit: ['firstLevelName', 'secondLevelName', ORG_UNIT_ID],
        } as Business,
      };

      const organigram: UnitTreeNode[] = [
        {
          id: 'firstLevel',
          name: 'firstLevelName',
          children: [
            {
              id: 'secondLevel',
              name: 'secondLevelName',
              children: [{ ...nodeOfUser, depth: 2 }],
            },
          ],
        } as UnitTreeNode,
      ];

      expect(service.getNodeForUser(user as Person, organigram, 0)).toEqual({
        ...nodeOfUser,
        depth: 2,
      });
    }
  ));

  it('should return null if OrgUnit not found', inject(
    [OrganigramService],
    (service: OrganigramService) => {
      const user: Partial<Person> = {
        Business: {
          ShortOrgUnit: [ORG_UNIT_ID],
          OrgUnit: [ORG_UNIT_ID],
        } as Business,
      };

      const organigram: UnitTreeNode[] = [];

      expect(service.getNodeForUser(user as Person, organigram, 0)).toEqual(null);
    }
  ));
});
