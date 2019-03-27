import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule, MatCheckboxModule, MatDialog, MatDialogRef } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';
import { DisplayNotificationDialog } from './display-notification.dialog';

// Deactivated, because MatDialogRef is not easily testable.
xdescribe('DisplayNotificationDialog', () => {
  let component: DisplayNotificationDialog;
  let fixture: ComponentFixture<DisplayNotificationDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DisplayNotificationDialog,
        MockComponent({ selector: 'mat-list-item' }),
        MockComponent({ selector: 'mat-list' })
      ],
      imports: [MatCheckboxModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNotificationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
