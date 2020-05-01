import { CdkDragEnd, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person, PhonebookSortDirection } from 'src/app/shared/models';
import { Layout } from 'src/app/shared/models/enumerables/Layout';
import {
  AppState,
  BookmarksState,
  SetLayout,
  SetRecentPeopleDrawer,
  ToggleBookmark,
  UpdateBookmarkOrder,
} from 'src/app/shared/states';
import {
  LastPersonsState,
  RemoveFromLastPersons,
  ResetLastPersons,
  SetLastPersons,
} from 'src/app/shared/states/LastPersons.state';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { MatDrawerMode } from '@angular/material/sidenav';
import { BookmarkedComponent } from 'src/app/pages/dashboard/components/bookmarked/bookmarked.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: { class: 'pb-expand' },
})
export class DashboardComponent implements OnInit, OnDestroy {
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
  public activeLayout$: Observable<Layout>;
  public layouts: string[] = Object.values(Layout);

  public layout: typeof Layout = Layout;
  public drawerOpen: boolean = false;
  public drawerMode: MatDrawerMode = 'side';
  public smallScreen: boolean = false;
  public currentUser: Person | null = null;
  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private currentUserService: CurrentUserService
  ) {}

  public ngOnInit() {
    this.changeOrder();
    this.store
      .select(AppState.recentPeopleDrawer)
      .pipe(untilComponentDestroyed(this))
      .subscribe((open) => {
        this.drawerOpen = open;
      });
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(untilComponentDestroyed(this))
      .subscribe((result) => {
        this.smallScreen = result.matches;
        if (this.smallScreen) {
          this.drawerOpen = false;
        } else {
          this.drawerOpen = this.store.selectSnapshot(AppState.recentPeopleDrawer);
        }
      });
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

  public getLayoutName(layout: Layout): string {
    switch (layout) {
      case Layout.medium_cards: {
        return $localize`:NavigationComponent|View Mode - MediumCards@@NavigationComponentViewModeMediumCards:Medium Cards`;
      }
      case Layout.small_cards: {
        return $localize`:NavigationComponent|View Mode - SmallCards@@NavigationComponentViewModeSmallCards:Small Cards`;
      }
      default:
        throw Error(`Translation for layout ${layout} does not exist.`);
    }
  }

  public toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
    if (!this.smallScreen) {
      this.store.dispatch(new SetRecentPeopleDrawer(this.drawerOpen));
    }
  }
  public ngOnDestroy(): void {}
}
