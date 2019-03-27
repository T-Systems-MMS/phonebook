import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { CurrentUserService } from './current-user.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { PersonService } from 'src/app/services/api/person.service';

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
    const response = 'domain\\username';

    service.getCurrentUserId().subscribe(user => {
      expect(user).toBe('username');
    });

    const req = httpMock.expectOne(`https://employee-pictures.example.com/user/whoami`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  }));

  afterEach(() => {
    httpMock.verify();
  });
});

export class MockPersonService {

}