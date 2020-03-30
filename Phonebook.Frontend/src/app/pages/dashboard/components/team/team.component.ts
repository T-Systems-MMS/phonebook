import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person, PhonebookSortDirection } from 'src/app/shared/models';
import { BookmarksState } from 'src/app/shared/states';
import { OrganigramService, UnitTreeNode } from 'src/app/services/api/organigram.service';

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
  public nodes: UnitTreeNode[] = [];

  constructor(private store: Store, private organigramService: OrganigramService) {}

  public ngOnInit() {
    this.changeOrder();
    this.organigramService.getOrganigram().subscribe(team => {
      this.nodes = team;
    });  }

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