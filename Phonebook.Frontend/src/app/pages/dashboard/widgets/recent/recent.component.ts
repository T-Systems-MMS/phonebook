import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LastPersonsState, BookmarksState, UpdateBookmarkOrder, ResetLastPersons, SetLastPersons, RemoveFromLastPersons, ToggleBookmark } from 'src/app/shared/states';
import { Observable, Subscription } from 'rxjs';
import { Person, PhonebookSortDirection } from 'src/app/shared/models';
import { map } from 'rxjs/operators';
import { CdkDragEnter, CdkDragEnd, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {
  @Select(LastPersonsState)
  public lastPersons$: Observable<Person[]>;
  public bookmarkedPersons: Person[];
  public bookmarkedPersonsSubscriptions: Subscription | null = null;
  public favoriteSort: PhonebookSortDirection = PhonebookSortDirection.none;
  public lastFrom: number;
  public lastTo: number;
  @Select(BookmarksState)
  public bookmarkedPersons$: Observable<Person[]>;
  public removedLastPersons: Person[] | null = null;
  constructor(private store: Store, private cd: ChangeDetectorRef) {}

  public ngOnInit() {
    this.changeOrder();
  }

  public changeOrder() {
    if (this.bookmarkedPersonsSubscriptions) {
      this.bookmarkedPersonsSubscriptions.unsubscribe();
    }
    this.bookmarkedPersonsSubscriptions = this.store
      .select(BookmarksState.sortedBookmarks)
      .pipe(map(filterFn => filterFn(this.favoriteSort)))
      .subscribe(persons => {
        this.bookmarkedPersons = persons;
      });
  }

  public entered(e: CdkDragEnter) {
    if (this.bookmarkedPersons && this.bookmarkedPersons.length === 1) {
      return;
    }

    this.lastFrom = e.item.data;
    this.lastTo = e.container.data;
  }

  public ended(e: CdkDragEnd) {
    if (this.bookmarkedPersons && this.bookmarkedPersons.length === 1) {
      return;
    }
    if (this.lastFrom === undefined || this.lastTo === undefined) {
      return;
    }
    moveItemInArray(this.bookmarkedPersons, this.lastFrom, this.lastTo);
    this.store.dispatch(new UpdateBookmarkOrder(this.bookmarkedPersons));
    this.cd.detectChanges();
  }

  public resetLastPersons() {
    this.removedLastPersons = this.store.selectSnapshot(LastPersonsState);
    this.store.dispatch(new ResetLastPersons());
  }

  public undoLastPersons() {
    if (this.removedLastPersons != null) {
      this.store.dispatch(new SetLastPersons(this.removedLastPersons));
      this.removedLastPersons = null;
    }
  }

  public removeFromLastPersons(person: Person) {
    this.store.dispatch(new RemoveFromLastPersons(person));
  }

  public removeFromBookmarkedPersons(person: Person) {
    this.store.dispatch(new ToggleBookmark(person));
  }
}
