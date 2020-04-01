import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { Person, PhonebookSortDirection } from 'src/app/shared/models';
import { Injectable } from '@angular/core';

export class ToggleBookmark {
  public static readonly type: string = '[Bookmarks] Toggle Bookmark';
  constructor(public person: Person) {}
}

export class UpdateBookmarkOrder {
  public static readonly type: string = '[Bookmarks] Set new Bookmark Order';
  constructor(public orderedBookmarks: Person[]) {}
}

@State<Person[]>({
  name: 'bookmarks',
  defaults: [],
})
@Injectable()
export class BookmarksState {
  @Selector()
  public static sortedBookmarks(state: Person[]) {
    return (sort: PhonebookSortDirection) => {
      if (sort === PhonebookSortDirection.none) {
        return state;
      } else {
        const array = state.slice();
        return array.sort((a, b) => {
          return ColumnDefinitions.fullname.sortFunction(a, b, sort);
        });
      }
    };
  }

  @Action(ToggleBookmark)
  public toggleBookmark(ctx: StateContext<Person[]>, action: ToggleBookmark) {
    const state = ctx.getState();
    const index = state.findIndex((p) => p.Id === action.person.Id);
    if (index >= 0) {
      // Person exists => Remove
      state.splice(index, 1);
      ctx.setState([...state]);
    } else {
      // Person does not exist => Add
      ctx.setState([...state, action.person]);
    }
  }

  @Action(UpdateBookmarkOrder)
  public updateBookmarkOrder(ctx: StateContext<Person[]>, action: UpdateBookmarkOrder) {
    if (ctx.getState().length === action.orderedBookmarks.length) {
      ctx.setState(action.orderedBookmarks);
    }
  }
}
