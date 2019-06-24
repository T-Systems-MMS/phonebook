import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MockComponent } from 'ng2-mock-component';
import { ReleaseNotificationDialog } from './release-notification.dialog';

// Deactivated, because MatDialogRef is not easily testable.
xdescribe('ReleaseNotificationDialog', () => {
  let component: ReleaseNotificationDialog;
  let fixture: ComponentFixture<ReleaseNotificationDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReleaseNotificationDialog,
        MockComponent({ selector: 'mat-list-item' }),
        MockComponent({ selector: 'mat-list' })
      ],
      imports: [MatCheckboxModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseNotificationDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
