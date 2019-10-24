import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectUserInformationComponent } from './Incorrect-user-information.component';

xdescribe('IncorrectUserInformationComponent', () => {
  let component: IncorrectUserInformationComponent;
  let fixture: ComponentFixture<IncorrectUserInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorrectUserInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorrectUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
