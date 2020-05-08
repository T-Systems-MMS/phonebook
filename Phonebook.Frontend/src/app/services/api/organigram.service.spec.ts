import { inject, TestBed } from '@angular/core/testing';
import { OrganigramService } from './organigram.service';
import { PersonService } from './person.service';
import { HttpClient } from '@angular/common/http';

describe('OrganigramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganigramService,
        { provide: PersonService, useValue: null },
        { provide: HttpClient, useValue: null },
      ],
    });
  });

  it('should be created', inject([OrganigramService], (service: OrganigramService) => {
    expect(service).toBeTruthy();
  }));
});
