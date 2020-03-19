import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CdkDragEnd, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person, PhonebookSortDirection } from 'src/app/shared/models';
import { BookmarksState, ToggleBookmark, UpdateBookmarkOrder } from 'src/app/shared/states';
import { AppState, SetLayout } from 'src/app/shared/states';
import { Layout } from 'src/app/shared/models/enumerables/Layout';
import { MatCard } from '@angular/material/card';
import {
  LastPersonsState,
  RemoveFromLastPersons,
  ResetLastPersons,
  SetLastPersons
} from 'src/app/shared/states/LastPersons.state';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { MatDrawerMode } from '@angular/material/sidenav';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: { class: 'pb-expand' }
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('tinyCard', { static: true })
  public tinyCard: MatCard;
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
  @Select(AppState.activeLayout)
  public layoutValue$: Observable<Layout>;
  public layouts: string[] = Object.values(Layout);
  public layoutSetting: string;
  public drawerOpen: boolean = !this.breakpointObserver.isMatched('(max-width: 768px)');
  public drawerMode: MatDrawerMode = 'side';
  public smallerScreen: boolean = false;
  constructor(private store: Store, private cd: ChangeDetectorRef, private breakpointObserver: BreakpointObserver) {}

  public ngOnInit() {
    this.changeOrder();
    const activeLayoutState = this.store.selectOnce(state => state.appstate.activeLayout);
    activeLayoutState.subscribe(d => {
      this.layoutSetting = d;
    });
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(untilComponentDestroyed(this))
      .subscribe(result => {
        this.drawerMode = !result.matches ? 'side' : 'push';
      });
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

  public changeLayout(layoutClass: Layout) {
    this.store.dispatch(new SetLayout(layoutClass));
  }

  ngOnDestroy(): void {}
}
