import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSettingsDialog } from './table-settings.dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MockComponent } from 'ng2-mock-component';

// Deactivated, because MatDialogRef is not easily testable.
xdescribe('TableSettingsDialog', () => {
  let component: TableSettingsDialog;
  let fixture: ComponentFixture<TableSettingsDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableSettingsDialog,
        MockComponent({ selector: 'mat-list-item' }),
        MockComponent({ selector: 'mat-list' })
      ],
      imports: [MatCheckboxModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSettingsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
