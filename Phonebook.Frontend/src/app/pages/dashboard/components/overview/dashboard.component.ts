import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person, PhonebookSortDirection } from 'src/app/shared/models';
import { BookmarksState, ToggleBookmark, UpdateBookmarkOrder } from 'src/app/shared/states';
import {
  LastPersonsState,
  RemoveFromLastPersons,
  ResetLastPersons,
  SetLastPersons
} from 'src/app/shared/states/LastPersons.state';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { MatDrawerMode } from '@angular/material/sidenav';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: { class: 'pb-expand' }
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
  public drawerOpen: boolean = !this.breakpointObserver.isMatched('(max-width: 768px)');
  public drawerMode: MatDrawerMode = 'side';
  public smallerScreen: boolean = false;
  public currentUser: Person | null = null;
  constructor(private store: Store,
    private cd: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private currentUserService: CurrentUserService) {}

  public ngOnInit() {
    this.changeOrder();
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(untilComponentDestroyed(this))
      .subscribe(result => {
        this.drawerMode = !result.matches ? 'side' : 'push';
      });
    this.currentUserService
    .getCurrentUser()
    .pipe(untilComponentDestroyed(this))
    .subscribe(
      user => {
        if (user != null && this.bookmarkedPersons.length === 0) {
          this.router.navigate(['/team']);
        }
      },
      error => {
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
      .pipe(map(filterFn => filterFn(this.favoriteSort)))
      .subscribe(persons => {
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

  ngOnDestroy(): void {}
}
