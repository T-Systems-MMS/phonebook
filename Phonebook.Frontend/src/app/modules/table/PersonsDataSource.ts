import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { performSearch, SearchParams } from 'src/app/modules/table/SearchParams';
import { SearchFilter, TableSort } from 'src/app/shared/models';
import { Person } from 'src/app/shared/models/classes';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';

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

  private worker: Worker | null = null;

  constructor(private dataSource: Person[], private httpClient: HttpClient) {
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
    sort: TableSort | null
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

      if (typeof Worker !== 'undefined') {
        // Reuse the Worker if it already exists.
        if (this.worker == null) {
          // Loading external Workers does not error if it could not be found...
          this.httpClient
            .get('table.worker', {
              responseType: 'text'
            })
            .subscribe(
              req => {
                const blob = new Blob([req]);
                this.worker = new Worker(window.URL.createObjectURL(blob), { type: 'module' });
                this.worker.onmessage = ({ data }) => {
                  this.resolveObserver(data, observer);
                };
                this.worker.onerror = (error: ErrorEvent) => {
                  const searchResult = performSearch(searchParams);
                  this.resolveObserver(searchResult, observer);
                  Error.captureStackTrace(this, Error);
                  throw new Error('Service Worker crashed.');
                };
                this.worker.postMessage(searchParams);
              },
              () => {
                const searchResult = performSearch(searchParams);
                this.resolveObserver(searchResult, observer);
                throw new Error('Service Worker could not be loaded.');
              }
            );
        }
      } else {
        const searchResult = performSearch(searchParams);
        this.resolveObserver(searchResult, observer);
      }
    });
  }

  private resolveObserver(searchResult: Person[], observer: Subscriber<Person[]>): void {
    this.allData = searchResult;

    this.loadingSubject.next(false);
    observer.next(searchResult);
    observer.complete();
  }

  private updateVisibleData() {
    this.dataChanged.next(this.allData.slice(0, this.pageSize));
  }
}
