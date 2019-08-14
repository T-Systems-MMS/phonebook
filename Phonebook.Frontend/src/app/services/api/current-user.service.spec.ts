import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { PersonService } from 'src/app/services/api/person.service';
import { CurrentUserService } from './current-user.service';

describe('CurrentUserService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PersonService, useClass: MockPersonService }, CurrentUserService]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([CurrentUserService], (service: CurrentUserService) => {
    expect(service).toBeTruthy();
  }));

  it('should return Username', inject([CurrentUserService], (service: CurrentUserService) => {
    const response = {
      user: 'DOMAIN\\username',
      hasPicture: true
    };

    service.getCurrentUserId().subscribe(user => {
      expect(user).toBe('username');
    });

    const req = httpMock.expectOne(`https://employee-pictures.example.com/user/whoami?version=2`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  }));

  it('should return hasPicture', inject([CurrentUserService], (service: CurrentUserService) => {
    const response = {
      user: 'DOMAIN\\username',
      hasPicture: true
    };

    service.doesUserHasImage().subscribe(hasImage => {
      expect(hasImage).toBe(true);
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
