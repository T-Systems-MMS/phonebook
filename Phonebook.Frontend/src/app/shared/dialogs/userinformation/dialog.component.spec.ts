import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationDialogComponent } from './dialog.component';

// Deactivated, because MatDialogRef is not easily testable.
xdescribe('UserInformationDialogComponent', () => {
  let component: UserInformationDialogComponent;
  let fixture: ComponentFixture<UserInformationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInformationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
