import { TestBed, inject } from '@angular/core/testing';
import { OrganigramService } from './organigram.service';
import { Person } from 'src/app/shared/models';
import { PersonService } from './person.service';
import { mockPerson } from 'src/app/shared/mocks/person';

describe('OrganigramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganigramService, { provide: PersonService, useValue: null }]
    });
  });

  it('should be created', inject([OrganigramService], (service: OrganigramService) => {
    expect(service).toBeTruthy();
  }));
});
