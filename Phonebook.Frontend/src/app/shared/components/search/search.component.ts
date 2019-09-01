import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { Observable } from 'rxjs';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { ColumnTranslate } from 'src/app/shared/config/columnTranslate';
import { SearchFilter } from 'src/app/shared/models';
import {
  AddSearchFilter,
  RemoveLastSearchFilter,
  RemoveSearchFilter,
  ResetSearch,
  SearchState,
  UpdateUrl
} from 'src/app/shared/states';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public focused: boolean = false;
  @Select(SearchState.searchTerm)
  public searchTerm$: Observable<string>;
  public filterTimer: number;
  @Select(SearchState.searchFilters)
  public searchFilters$: Observable<SearchFilter[]>;
  public DEBOUNCE_TIME: number = 300;
  private containsFilterMarker: RegExp = new RegExp(':');
  private previousSearchTerm: string = '';

  @ViewChild('input', { static: true })
  public input: ElementRef;
  constructor(private snackBar: MatSnackBar, private store: Store, public columnTranslate: ColumnTranslate) {}

  public ngOnInit() {
    this.searchTerm$.pipe(untilComponentDestroyed(this)).subscribe(val => {
      setTimeout(() => {
        this.previousSearchTerm = val;
      }, 100);
    });
  }

  public ngOnDestroy() {}

  public reset(e: Event) {
    this.store.dispatch(new ResetSearch());
  }

  public updateFilterString(searchTerm: string) {
    if (this.filterTimer != null) {
      window.clearTimeout(this.filterTimer);
    }
    this.filterTimer = window.setTimeout(() => {
      // Do nothing if it contains the Filter Marker (':')
      if (!this.containsFilterMarker.test(searchTerm)) {
        this.store.dispatch(new UpdateUrl({ searchTerm: searchTerm }));
      }
    }, this.DEBOUNCE_TIME);
  }

  public removeFilter(filter: SearchFilter) {
    this.store.dispatch(new RemoveSearchFilter(filter));
    if (this.store.selectSnapshot(SearchState.searchFilters).length === 0) {
      this.focusInput();
    }
  }

  private focusInput() {
    (<HTMLElement>this.input.nativeElement).focus();
  }

  public backspace() {
    if (this.previousSearchTerm.length === 0) {
      this.store.dispatch(new RemoveLastSearchFilter());
    }
  }

  public checkForNewFilter(event: Event) {
    const filterString = (event.target as HTMLInputElement).value;
    if (this.containsFilterMarker.test(filterString)) {
      event.preventDefault();
      const keyvalue = filterString.split(':');
      const col = ColumnDefinitions.getAll().find(col => {
        return keyvalue[0].toLowerCase() === this.columnTranslate.getTranslation(col.id).toLowerCase();
      });
      if (col != null) {
        this.store.dispatch(new AddSearchFilter({ filterColumn: col.id, filterValue: keyvalue[1] }));
        (event.target as HTMLInputElement).value = '';
      } else {
        this.snackBar
          .open('The Column you want to filter does not exist: "' + keyvalue[0] + '"', '', { duration: 4000 })
          .afterDismissed()
          .subscribe(() => {});
      }
    }
  }
}
