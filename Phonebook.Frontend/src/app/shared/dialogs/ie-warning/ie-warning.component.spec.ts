import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IeWarningComponent } from './ie-warning.component';

xdescribe('IeWarningComponent', () => {
  let component: IeWarningComponent;
  let fixture: ComponentFixture<IeWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IeWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IeWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
