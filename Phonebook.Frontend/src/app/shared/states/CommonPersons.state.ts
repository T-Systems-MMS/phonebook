import { Action, State, StateContext } from '@ngxs/store';
import { Person } from 'src/app/shared/models';

/**
 * Adds the person to the list of common persons or increases the click count
 */
export class IncrementCommonPerson {
  public static readonly type: string = '[Common Persons] Increment Person';
  constructor(public person: Person) {}
}
export class ResetCommonPersons {
  public static readonly type: string = '[Common Persons] Reset';
}

export class RemoveCommonPerson {
  public static readonly type: string = '[Common Persons] Remove Person';
  constructor(public person: Person) {}
}

@State<ClicksPerPerson[]>({
  name: 'commonpersons',
  defaults: []
})
export class CommonPersonsState {
  @Action(IncrementCommonPerson)
  public incrementPerson(ctx: StateContext<ClicksPerPerson[]>, action: IncrementCommonPerson) {
    const state = ctx.getState();
    const index = state.findIndex(p => {
      return p.person.Id === action.person.Id;
    });
    if (index === -1) {
      state.push(new ClicksPerPerson(action.person, 1));
    } else {
      state[index].clicks++;
    }
    ctx.setState([...state]);
  }

  @Action(ResetCommonPersons)
  public resetCommonPersons(ctx: StateContext<ClicksPerPerson[]>) {
    ctx.setState([]);
  }

  @Action(RemoveCommonPerson)
  public removeCommonPerson(ctx: StateContext<ClicksPerPerson[]>, action: RemoveCommonPerson) {
    const state = ctx.getState();
    const index = state.findIndex(p => {
      return p.person.Id === action.person.Id;
    });
    if (index === -1) {
      return;
    }
    state.splice(index, 1);
    ctx.setState([...state]);
  }
}

export class ClicksPerPerson {
  public person: Person;
  public clicks: number;

  constructor(person: Person, clicks: number) {
    this.person = person;
    this.clicks = clicks;
  }
}
