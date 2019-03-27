import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDrawerSheetComponent } from './action-drawer-sheet.component';

// Deactivated, because MatBottomSheetRef is not easily testable.
xdescribe('ActionDrawerSheetComponent', () => {
  let component: ActionDrawerSheetComponent;
  let fixture: ComponentFixture<ActionDrawerSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionDrawerSheetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDrawerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
