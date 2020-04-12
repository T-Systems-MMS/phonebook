import { Component } from '@angular/core';
import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MockComponent } from 'ng2-mock-component';
import { Observable, of } from 'rxjs';
import { ChangeProfilePictureComponent } from 'src/app/modules/profile-picture/components/change-profile-picture/change-profile-picture.component';
import { ProfilePictureService } from 'src/app/modules/profile-picture/profile-picture.service';
import { CurrentUserService } from 'src/app/services/api/current-user.service';

xdescribe('ChangeProfilePictureComponent', () => {
  let component: ChangeProfilePictureComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [
        MockComponent({ selector: 'mat-icon' }),
        ChangeProfilePictureComponent,
        TestComponentWrapper,
      ],
      providers: [
        { provide: CurrentUserService, useClass: mockCurrentUserService },
        { provide: ProfilePictureService, useClass: MockProfilePictureService },
      ],
    }).compileComponents();
    injector = getTestBed();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockProfilePictureService {}
export class mockCurrentUserService {
  public getCurrentUserId(): Observable<string> {
    return of('username');
  }
}

@Component({
  selector: 'test-component-wrapper',
  template: '<app-change-profile-picture [userId]="id"></app-change-profile-picture>',
})
class TestComponentWrapper {
  public id = 'test';
}
