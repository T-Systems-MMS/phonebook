import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CdkDragEnd, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person, PhonebookSortDirection } from 'src/app/shared/models';
import {
  BookmarksState,
  ToggleBookmark,
  UpdateBookmarkOrder,
  AppState,
} from 'src/app/shared/states';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { Router } from '@angular/router';
import { Layout } from 'src/app/shared/models/enumerables/Layout';

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.scss'],
  host: { class: 'pb-dashboard-component' },
})
export class BookmarkedComponent implements OnInit, OnDestroy {
  public bookmarkedPersons: Person[];
  public bookmarkedPersonsSubscriptions: Subscription | null = null;
  public favoriteSort: PhonebookSortDirection = PhonebookSortDirection.none;
  public lastFrom: number;
  public lastTo: number;
  @Select(BookmarksState)
  public bookmarkedPersons$: Observable<Person[]>;
  public currentUser: Person | null = null;
  @Select(AppState.activeLayout)
  public activeLayout$: Observable<Layout>;
  public layouts: string[] = Object.values(Layout);
  public layout: typeof Layout = Layout;
  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private currentUserService: CurrentUserService
  ) {}

  public ngOnInit() {
    this.changeOrder();
    this.currentUserService
      .getCurrentUser()
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (user) => {
          if (user != null) {
            this.currentUser = user;
          }
        },
        (error) => {
          this.currentUser = null;
        }
      );
  }

  public changeOrder() {
    if (this.bookmarkedPersonsSubscriptions) {
      this.bookmarkedPersonsSubscriptions.unsubscribe();
    }
    this.bookmarkedPersonsSubscriptions = this.store
      .select(BookmarksState.sortedBookmarks)
      .pipe(map((filterFn) => filterFn(this.favoriteSort)))
      .subscribe((persons) => {
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

  public removeFromBookmarkedPersons(person: Person) {
    this.store.dispatch(new ToggleBookmark(person));
  }

  public ngOnDestroy(): void {}
}
