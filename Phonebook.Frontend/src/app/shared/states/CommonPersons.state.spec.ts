import { Store, NgxsModule } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { Person } from 'src/app/shared/models';
import {
  IncrementCommonPerson,
  ClicksPerPerson,
  CommonPersonsState,
  ResetCommonPersons,
  RemoveCommonPerson
} from 'src/app/shared/states/CommonPersons.state';

describe('[States] Common Persons', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CommonPersonsState])]
    }).compileComponents();
    store = TestBed.get(Store);
    store.reset({
      commonpersons: []
    });
  }));
  it('it increments CommonPersons', () => {
    const person: Person = Person.empty();
    person.Id = 'test';
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([]);
    store.dispatch(new IncrementCommonPerson(person));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([
      new ClicksPerPerson(person, 1)
    ]);
    store.dispatch(new IncrementCommonPerson(person));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([
      new ClicksPerPerson(person, 2)
    ]);
  });
  it('it increments CommonPersons - independently', () => {
    const person1: Person = Person.empty();
    person1.Id = 'test1';
    const person2: Person = Person.empty();
    person2.Id = 'test2';
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([]);
    store.dispatch(new IncrementCommonPerson(person1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([
      new ClicksPerPerson(person1, 1)
    ]);
    store.dispatch(new IncrementCommonPerson(person2));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([
      new ClicksPerPerson(person1, 1),
      new ClicksPerPerson(person2, 1)
    ]);
    store.dispatch(new IncrementCommonPerson(person1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([
      new ClicksPerPerson(person1, 2),
      new ClicksPerPerson(person2, 1)
    ]);
    store.dispatch(new IncrementCommonPerson(person2));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([
      new ClicksPerPerson(person1, 2),
      new ClicksPerPerson(person2, 2)
    ]);
  });

  it('it resets CommonPersons', () => {
    const person: Person = Person.empty();
    person.Id = 'test';
    store.reset({
      commonpersons: [new ClicksPerPerson(person, 1)]
    });
    store.dispatch(new ResetCommonPersons());
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([]);
  });

  it('it removes CommonPersons', () => {
    const person: Person = Person.empty();
    person.Id = 'test';
    store.reset({
      commonpersons: [new ClicksPerPerson(person, 1)]
    });
    store.dispatch(new RemoveCommonPerson(person));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([]);
  });

  it('it removes CommonPersons - no Persons existing', () => {
    const person: Person = Person.empty();
    person.Id = 'test';
    store.reset({
      commonpersons: []
    });
    store.dispatch(new RemoveCommonPerson(person));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([]);
  });

  it('it removes CommonPersons - Person not existing', () => {
    const person1: Person = Person.empty();
    person1.Id = 'test1';
    const person2: Person = Person.empty();
    person2.Id = 'test2';
    const person3: Person = Person.empty();
    person3.Id = 'test3';
    store.reset({
      commonpersons: [new ClicksPerPerson(person1, 1), new ClicksPerPerson(person2, 1)]
    });
    store.dispatch(new RemoveCommonPerson(person3));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([
      new ClicksPerPerson(person1, 1),
      new ClicksPerPerson(person2, 1)
    ]);
  });

  it('it removes CommonPersons - independently', () => {
    const person1: Person = Person.empty();
    person1.Id = 'test1';
    const person2: Person = Person.empty();
    person2.Id = 'test2';
    store.reset({
      commonpersons: [new ClicksPerPerson(person1, 1), new ClicksPerPerson(person2, 1)]
    });
    store.dispatch(new RemoveCommonPerson(person1));

    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.commonpersons)).toEqual([
      new ClicksPerPerson(person2, 1)
    ]);
  });
});
