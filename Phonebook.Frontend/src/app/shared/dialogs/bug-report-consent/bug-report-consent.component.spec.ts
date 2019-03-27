import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportConsentComponent } from './bug-report-consent.component';
import { MockComponent } from 'ng2-mock-component';

// Deactivated, because MatDialogRef is not easily testable.
xdescribe('BugReportConsentComponent', () => {
  let component: BugReportConsentComponent;
  let fixture: ComponentFixture<BugReportConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BugReportConsentComponent,
        MockComponent({ selector: 'mat-list-item' }),
        MockComponent({ selector: 'mat-list' })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
