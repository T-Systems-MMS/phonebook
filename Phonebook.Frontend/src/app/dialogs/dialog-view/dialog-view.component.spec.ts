import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewComponent } from './dialog-view.component';

describe('DialogViewComponent', () => {
  let component: DialogViewComponent;
  let fixture: ComponentFixture<DialogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
