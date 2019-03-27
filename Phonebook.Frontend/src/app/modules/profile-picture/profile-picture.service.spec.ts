import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfilePictureService } from 'src/app/modules/profile-picture/profile-picture.service';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { PersonService } from 'src/app/services/api/person.service';

describe('ProfilePictureService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PersonService, useClass: mockPersonService }, CurrentUserService, ProfilePictureService]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([ProfilePictureService], (service: ProfilePictureService) => {
    expect(service).toBeTruthy();
  }));

  afterEach(() => {
    httpMock.verify();
  });
});

export class mockPersonService {

}
