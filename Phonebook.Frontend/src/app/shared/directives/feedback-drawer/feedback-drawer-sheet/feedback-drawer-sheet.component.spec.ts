import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackDrawerSheetComponent } from './feedback-drawer-sheet.component';


xdescribe('FeedbackDrawerSheetComponent', () => {
  let component: FeedbackDrawerSheetComponent;
  let fixture: ComponentFixture<FeedbackDrawerSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackDrawerSheetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDrawerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
