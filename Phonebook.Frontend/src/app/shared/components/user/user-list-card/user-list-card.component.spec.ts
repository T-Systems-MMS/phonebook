import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPipe } from 'ng-mocks';
import { UserListCardComponent } from 'src/app/shared/components/user/user-list-card/user-list-card.component';
import { Person } from 'src/app/shared/models';
import { TelephonePipe } from 'src/app/shared/pipes/telephone.pipe';

describe('UserListCardCompoent', () => {
  let component: UserListCardComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapper, UserListCardComponent, MockPipe(TelephonePipe, (...args) => args[0])],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the full name', () => {
    component.person.Title = 'Dr.';
    component.person.Firstname = 'First';
    component.person.Surname = 'Surname';
    component.person.Id = 'abcd';
    expect(component.displayListCard()).toEqual('Dr. First Surname (abcd)');
  });

  it('should display name without title', () => {
    component.person.Title = 'Dr.';
    component.person.Firstname = 'First';
    component.person.Surname = 'LongSurname';
    component.person.Id = 'abcd';
    expect(component.displayListCard()).toEqual('First LongSurname (abcd)');
  });

  it('should display name without title and surname', () => {
    component.person.Title = 'Dr.';
    component.person.Firstname = 'First';
    component.person.Surname = 'ReallyLongLongSurname';
    component.person.Id = 'abcd';
    expect(component.displayListCard()).toEqual('First (abcd)');
  });

  it('should display name without title, surname and firstname', () => {
    component.person.Title = 'Dr.';
    component.person.Firstname = 'ReallyReallyLongFirstName';
    component.person.Surname = 'ReallyLongLongSurname';
    component.person.Id = 'abcd';
    expect(component.displayListCard()).toEqual('abcd');
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<app-user-list-card [person]="person"></app-user-list-card>'
})
class TestComponentWrapper {
  public person: Person = Person.empty();
}
