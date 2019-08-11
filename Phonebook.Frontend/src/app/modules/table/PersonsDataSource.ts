import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { performSearch, SearchParams } from 'src/app/modules/table/SearchParams';
import { SearchFilter, TableSort } from 'src/app/shared/models';
import { Person } from 'src/app/shared/models/classes';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';
import { Environment } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';

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
  private worker: Worker | null = null;

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
    searchableColumns: ColumnId[],
    sort: TableSort
  ): Observable<Person[]> {
    this.loadingSubject.next(true);
    return new Observable<Person[]>(observer => {
      const searchParams: SearchParams = {
        filterKeyword: filterKeyword,
        searchFilters: searchFilters,
        searchableColumns: searchableColumns,
        sort: sort,
        data: this.dataSource
      };

      if (typeof Worker !== 'undefined' && runtimeEnvironment.environment != Environment.development) {
        if(this.worker == null){
          this.worker = new Worker('./table.worker', { type: 'module' });
        }
        this.worker.onmessage = ({ data }) => {
          this.allData = data;
          this.lastFilterKeyword = filterKeyword;

          this.loadingSubject.next(false);
          observer.next(data);
          observer.complete();
        };
        this.worker.postMessage(searchParams);
      } else {
        let searchResult = performSearch(searchParams);
        this.allData = searchResult;
        this.lastFilterKeyword = filterKeyword;

        this.loadingSubject.next(false);
        observer.next(searchResult);
        observer.complete();
      }
    });
  }

  private updateVisibleData() {
    this.dataChanged.next(this.allData.slice(0, this.pageSize));
  }
}
