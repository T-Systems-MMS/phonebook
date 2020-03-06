import { Action, State, StateContext } from '@ngxs/store';
import { Person } from 'src/app/shared/models';
import { Injectable } from '@angular/core';

export class AddToLastPersons {
  public static readonly type: string = '[Last Persons] Add Person';
  constructor(public person: Person) {}
}

export class SetLastPersons {
  public static readonly type: string = '[Last Persons] Set Persons';
  constructor(public persons: Person[]) {}
}

export class ResetLastPersons {
  public static readonly type: string = '[Last Persons] Reset';
}

export class RemoveFromLastPersons {
  public static readonly type: string = '[Last Persons] Remove Person';
  constructor(public person: Person) {}
}

@State<Person[]>({
  name: 'lastpersons',
  defaults: []
})
@Injectable()
export class LastPersonsState {
  @Action(AddToLastPersons)
  public incrementPerson(ctx: StateContext<Person[]>, action: AddToLastPersons) {
    const state = ctx.getState();
    const index = state.findIndex(p => {
      return p.Id === action.person.Id;
    });
    if (index > -1) {
      //already contained
      state.splice(index, 1); //remove element
    }
    state.unshift(action.person);
    ctx.setState([...state]);
  }

  @Action(ResetLastPersons)
  public resetLastPersons(ctx: StateContext<Person[]>) {
    ctx.setState([]);
  }

  @Action(RemoveFromLastPersons)
  public removeCommonPerson(ctx: StateContext<Person[]>, action: RemoveFromLastPersons) {
    const state = ctx.getState();
    const index = state.findIndex(p => {
      return p.Id === action.person.Id;
    });
    if (index > -1) {
      state.splice(index, 1);
    }
    ctx.setState([...state]);
  }

  @Action(SetLastPersons)
  public setLastPersons(ctx: StateContext<Person[]>, action: SetLastPersons) {
    ctx.setState(action.persons);
  }
}
