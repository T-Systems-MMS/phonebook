import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, SortDirection } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PersonsDataSource } from 'src/app/modules/table/PersonsDataSource';
import { PersonService } from 'src/app/services/api/person.service';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { Person, PhonebookSortDirection, TableSort } from 'src/app/shared/models';
import { SearchState, SetTableResultCount, TableState, UpdateUrl } from 'src/app/shared/states';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: { class: 'pb-fill-parent' },
})
export class TableComponent implements OnInit, OnDestroy {
  public sizeSmall: boolean = false;
  public get displayedColumns(): string[] {
    if (this.sizeSmall === true) {
      return this.store.selectSnapshot(TableState.visibleSmallColumns).map((col) => col.id);
    } else {
      return this.store.selectSnapshot(TableState.visibleBigColumns).map((col) => col.id);
    }
  }
  public dataSource: PersonsDataSource = new PersonsDataSource([]);
  public onTop: boolean = true;
  public columns: typeof ColumnDefinitions = ColumnDefinitions;
  public previewPerson: Person | null = null;

  public refreshTableSubscription: Subscription;

  private readonly initialPageSize = 30;

  @ViewChild(MatSort, { static: true })
  public sort: MatSort;
  public table: Element;
  public get tableSort(): TableSort {
    const col = ColumnDefinitions.getAll().find((column) => {
      return this.sort.active === column.id;
    });
    return { column: col || null, direction: this.sort.direction as PhonebookSortDirection };
  }
  public sortDirection: SortDirection = '';
  public sortActive: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    public dialog: MatDialog,
    public store: Store,
    public breakpointObserver: BreakpointObserver
  ) {}

  public ngOnInit() {
    this.breakpointObserver
      .observe('(max-width: 900px)')
      .pipe(untilComponentDestroyed(this))
      .subscribe((result) => {
        this.sizeSmall = result.matches;
        if (this.sizeSmall) {
          return this.sizeSmall === true;
        } else {
          return this.sizeSmall === false;
        }
      });
    this.personService.getAll().subscribe((persons) => {
      this.dataSource = new PersonsDataSource(persons);

      // Defer until Data is loaded.
      this.refreshTableSubscription = merge(
        this.store.select(SearchState.searchTerm),
        this.store.select(SearchState.searchFilters)
      )
        .pipe(
          // Debounce Time is this low, as it just aims to bundle all Observables above, especially at first page load,
          // where all three fire as they are initialized.
          debounceTime(50)
        )
        .subscribe((val) => {
          this.refreshTable();
          this.dataSource.pageSize = this.initialPageSize;
        });
    });

    this.route.queryParamMap.pipe(untilComponentDestroyed(this)).subscribe((queryParams) => {
      // Table Sort
      const sortDirection = queryParams.get('sortDirection');
      const sortColumn = queryParams.get('sortColumn');
      if (sortColumn != null && (sortDirection === 'asc' || sortDirection === 'desc')) {
        this.sortActive = sortColumn;
        this.sortDirection = sortDirection;
      }
    });

    // Listens for changes of the Table Headers (Sorting)
    this.sort.sortChange.subscribe((ev: { active: string; direction: string }) => {
      this.store.dispatch(
        new UpdateUrl({
          tableSort: this.tableSort,
        })
      );
      this.refreshTable();
    });
  }

  public refreshTable() {
    this.dataSource
      .refresh(
        this.store.selectSnapshot(SearchState.searchTerm).trim(),
        this.store.selectSnapshot(SearchState.searchFilters),
        this.store.selectSnapshot(TableState.visibleBigColumns),
        this.tableSort
      )
      .subscribe((results) => {
        this.store.dispatch(new SetTableResultCount(results.length));
        if (results.length === 1) {
          this.router.navigate(['/user', results[0].Id]);
        } else {
          const test = results.filter(
            (x) =>
              x.Id.toLowerCase() ===
              this.store.selectSnapshot(SearchState.searchTerm).trim().toLowerCase()
          );
          if (test.length === 1) {
            this.previewPerson = test[0];
          } else {
            this.previewPerson = null;
          }
        }
      });
  }

  public ngOnDestroy() {
    this.refreshTableSubscription.unsubscribe();
  }

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public routeToUser(id: string) {
    this.router.navigate(['/user', id]);
  }

  public trackById(index: any, item: Person) {
    return item.Id;
  }

  public loadMore() {
    this.dataSource.pageSize += 20;
  }

  public scrolling(event: Event) {
    if (event.target == null) {
      return;
    }
    this.table = event.target as HTMLElement;
    if (this.table.scrollTop > 2) {
      this.onTop = false;
    } else {
      this.onTop = true;
    }
  }

  public scrollToTop(t: any) {
    this.table.scrollTop = 0;
    this.dataSource.pageSize = this.initialPageSize;
  }
}
