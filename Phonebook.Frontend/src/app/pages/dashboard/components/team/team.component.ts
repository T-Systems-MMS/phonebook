import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person, PhonebookSortDirection } from 'src/app/shared/models';
import { BookmarksState } from 'src/app/shared/states';
import { OrganigramService, UnitTreeNode } from 'src/app/services/api/organigram.service';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  host: { class: 'pb-expand' }
})
export class TeamComponent implements OnInit, OnDestroy {
  public bookmarkedPersons: Person[];
  public bookmarkedPersonsSubscriptions: Subscription | null = null;
  public favoriteSort: PhonebookSortDirection = PhonebookSortDirection.none;
  @Select(BookmarksState)
  public bookmarkedPersons$: Observable<Person[]>;
  public currentUser: Person | null = null;
  public teamPersons: Person[];
  public person: Person;

  constructor(private store: Store,
    private organigramService: OrganigramService,
    private currentUserService: CurrentUserService,
    private router: Router) {}

  public ngOnInit() {
    this.changeOrder();
    this.organigramService.getUnitForUser().subscribe(node => {
      this.teamPersons = [...node.supervisors, ...node.assistents, ...node.employees, ...node.learners];
    });
    this.currentUserService
    .getCurrentUser()
    .pipe(untilComponentDestroyed(this))
    .subscribe(
      user => {
        if (user === null) {
          this.router.navigate(['']);
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

  ngOnDestroy(): void {}
}