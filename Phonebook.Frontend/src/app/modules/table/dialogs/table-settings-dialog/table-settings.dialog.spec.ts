import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Store } from '@ngxs/store';
import { MockComponent } from 'ng2-mock-component';
import { TableSettingsDialog } from 'src/app/modules/table/dialogs/table-settings-dialog/table-settings.dialog';

// Deactivated, because MatDialogRef is not easily testable.
xdescribe('TableSettingsDialog', () => {
  let store: Store;
  let component: TableSettingsDialog;
  let fixture: ComponentFixture<TableSettingsDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TableSettingsDialog,
        MockComponent({ selector: 'mat-list-item' }),
        MockComponent({ selector: 'mat-list' }),
      ],
      imports: [MatCheckboxModule],
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
