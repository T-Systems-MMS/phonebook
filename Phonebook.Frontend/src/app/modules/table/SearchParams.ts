import { TableLogic } from 'src/app/modules/table/table-logic';
import { Person, PhonebookSortDirection, SearchFilter, TableSort } from 'src/app/shared/models';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';

export class SearchParams {
  public filterKeyword: string;
  public searchFilters: SearchFilter[];
  public searchableColumns: ColumnId[];
  public sort: TableSort | null;
  public data: Person[];
}

export function performSearch(searchParams: SearchParams): Person[] {
  let preResult = searchParams.data;

  // Filtering
  searchParams.searchFilters.forEach(searchFilter => {
    preResult = TableLogic.filter(preResult, searchFilter.filterValue, [searchFilter.filterColumn]);
  });

  // Searching
  let searchResult: Person[] = TableLogic.filter(preResult, searchParams.filterKeyword, searchParams.searchableColumns);

  // Sorting
  if (searchParams.sort == null || searchParams.sort.direction === PhonebookSortDirection.none) {
    searchResult = TableLogic.rankedSort(searchResult, searchParams.filterKeyword, searchParams.searchableColumns);
  } else {
    searchResult = TableLogic.sort(searchResult, searchParams.sort);
  }
  return searchResult;
}
