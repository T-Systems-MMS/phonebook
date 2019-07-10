import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveAttributeFieldComponent } from './interactive-attribute-field.component';

describe('InteractiveAttributeFieldComponent', () => {
  let component: InteractiveAttributeFieldComponent;
  let fixture: ComponentFixture<InteractiveAttributeFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveAttributeFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveAttributeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
