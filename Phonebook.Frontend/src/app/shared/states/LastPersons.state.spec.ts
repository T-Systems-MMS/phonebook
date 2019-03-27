import { Store, NgxsModule } from '@ngxs/store';
import { async, TestBed } from '@angular/core/testing';
import { Person } from 'src/app/shared/models';
import {
  LastPersonsState,
  AddToLastPersons,
  ResetLastPersons,
  RemoveFromLastPersons
} from 'src/app/shared/states/LastPersons.state';

describe('[States] Common Persons', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([LastPersonsState])]
    }).compileComponents();
    store = TestBed.get(Store);
    store.reset({
      lastpersons: []
    });
  }));
  it('it adds LastPerson on Top', () => {
    const person1: Person = Person.empty();
    person1.Id = 'test1';
    const person2: Person = Person.empty();
    person2.Id = 'test2';
    const person3: Person = Person.empty();
    person3.Id = 'test3';
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([]);
    store.dispatch(new AddToLastPersons(person1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([person1]);
    store.dispatch(new AddToLastPersons(person2));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([person2, person1]);
    store.dispatch(new AddToLastPersons(person3));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([person3, person2, person1]);
  });

  it('it pushes LastPerson to Top', () => {
    const person1: Person = Person.empty();
    person1.Id = 'test1';
    const person2: Person = Person.empty();
    person2.Id = 'test2';
    const person3: Person = Person.empty();
    person3.Id = 'test3';
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([]);
    store.dispatch(new AddToLastPersons(person1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([person1]);
    store.dispatch(new AddToLastPersons(person2));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([person2, person1]);
    store.dispatch(new AddToLastPersons(person3));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([person3, person2, person1]);
    store.dispatch(new AddToLastPersons(person1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([person1, person3, person2]);
  });

  it('it resets LastPerson', () => {
    const person1: Person = Person.empty();
    person1.Id = 'test1';
    store.reset({
      lastpersons: [person1]
    });
    store.dispatch(new ResetLastPersons());
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([]);
  });

  it('it removes LastPerson', () => {
    const person1: Person = Person.empty();
    person1.Id = 'test1';
    store.reset({
      lastpersons: [person1]
    });
    store.dispatch(new RemoveFromLastPersons(person1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([]);
  });

  it('it removes LastPerson - independently', () => {
    const person1: Person = Person.empty();
    person1.Id = 'test1';
    const person2: Person = Person.empty();
    person2.Id = 'test2';
    const person3: Person = Person.empty();
    person3.Id = 'test3';
    store.reset({
      lastpersons: [person1, person2, person3]
    });
    store.dispatch(new RemoveFromLastPersons(person2));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([person1, person3]);
  });

  it('it removes LastPerson - no Person existing', () => {
    const person1: Person = Person.empty();
    person1.Id = 'test1';
    store.reset({
      lastpersons: []
    });
    store.dispatch(new RemoveFromLastPersons(person1));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([]);
  });

  it('it removes LastPerson - Person not existing', () => {
    const person1: Person = Person.empty();
    person1.Id = 'test1';
    const person2: Person = Person.empty();
    person2.Id = 'test2';
    const person3: Person = Person.empty();
    person3.Id = 'test3';
    store.reset({
      lastpersons: [person1, person3]
    });
    store.dispatch(new RemoveFromLastPersons(person2));
    expect(store.selectSnapshot(storeSnapshot => storeSnapshot.lastpersons)).toEqual([person1, person3]);
  });
});
