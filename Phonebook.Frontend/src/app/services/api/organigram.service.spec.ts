import { inject, TestBed, getTestBed } from '@angular/core/testing';
import { OrganigramService } from './organigram.service';
import { PersonService } from './person.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OrganigramService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrganigramService, { provide: PersonService, useClass: MockPersonService }],
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });
  it('should be created', inject([OrganigramService], (service: OrganigramService) => {
    expect(service).toBeTruthy();
  }));
  it('should return users OrgUnit', inject([OrganigramService], (service: OrganigramService) => {
    const response = {
      user: 'DOMAIN\\9t6l',
    };

    service.getNodeForCurrentUser().subscribe((team) => {
      expect(team.id).toEqual(['lz26wz']);
    });
    const req = httpMock.expectOne(`https://employee-pictures.example.com/user/whoami?version=2`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  }));
  afterEach(() => {
    httpMock.verify();
  });
});

export class MockPersonService {}
