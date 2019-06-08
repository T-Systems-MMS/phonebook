import { Person } from 'src/app/shared/models/classes';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableLogic } from 'src/app/modules/table/table-logic';
import { MatTableDataSource } from '@angular/material';
import { PhonebookSortDirection } from 'src/app/shared/models/enumerables/PhonebookSortDirection';
import { SearchFilter, Column, TableSort } from 'src/app/shared/models';

export class PersonsDataSource extends MatTableDataSource<Person> {
  private PAGE_SIZE: number = 30;
  public set pageSize(pageSize: number) {
    this.PAGE_SIZE = pageSize;
    this.updateVisibleData();
  }
  public get pageSize(): number {
    return this.PAGE_SIZE;
  }

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private ALL_DATA: Person[] = this.dataSource;
  public get allData(): Person[] {
    return this.ALL_DATA;
  }
  public set allData(data: Person[]) {
    this.ALL_DATA = data;
    this.updateVisibleData();
  }
  public get data(): Person[] {
    return this.allData.slice(0, this.pageSize);
  }

  public dataChanged: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>(this.data);

  private lastFilterKeyword: string = '';

  constructor(private dataSource: Person[]) {
    super();
  }

  public connect(): BehaviorSubject<Person[]> {
    return this.dataChanged;
  }

  public disconnect(): void {
    this.dataChanged.complete();
    this.loadingSubject.complete();
  }

  public refresh(
    filterKeyword: string,
    searchFilters: SearchFilter[],
    searchableColumns: Column[],
    sort: TableSort
  ): Observable<Person[]> {
    this.loadingSubject.next(true);
    return new Observable<Person[]>(observer => {
      let preResult = this.dataSource;

      // Filtering
      searchFilters.forEach(searchFilter => {
        preResult = TableLogic.filter(preResult, searchFilter.filterValue, [searchFilter.filterColumn]);
      });

      // Searching
      let searchResult: Person[] = preResult;
      if (this.lastFilterKeyword !== filterKeyword) {
        searchResult = TableLogic.filter(preResult, filterKeyword, searchableColumns);
      }

      // Sorting
      switch (sort.direction) {
        case PhonebookSortDirection.none: {
          searchResult = TableLogic.rankedSort(searchResult, filterKeyword, searchableColumns);
          break;
        }
        default: {
          searchResult = TableLogic.sort(searchResult, sort);
          break;
        }
      }
      this.allData = searchResult;
      this.lastFilterKeyword = filterKeyword;

      this.loadingSubject.next(false);
      observer.next(searchResult);
      observer.complete();
    });
  }

  private updateVisibleData() {
    this.dataChanged.next(this.allData.slice(0, this.pageSize));
  }
}
