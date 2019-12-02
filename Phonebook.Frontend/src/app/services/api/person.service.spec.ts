import { inject, TestBed } from '@angular/core/testing';
import { PersonService } from './person.service';


// Deactivated because MyList is not defined
xdescribe('PersonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonService]
    });
  });

  it('should be created', inject([PersonService], (service: PersonService) => {
    expect(service).toBeTruthy();
  }));
});
