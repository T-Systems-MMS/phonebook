/* tslint:disable:variable-name */
import { Person } from '../classes/Person';
import { PhonebookSortDirection } from 'src/app/shared/models/enumerables/PhonebookSortDirection';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';

export interface Column {
  id: ColumnId;
  // If Angular i18n ever supports translations in .ts files this should be used again.
  // title: string;
  rank: number;
  filterable: boolean;
  sortable: boolean;
  fullMatchFilter: boolean;
  sortFunction(a: Person, b: Person, sortDirection: PhonebookSortDirection): number;
  filterFunction(filterString: RegExp, person: Person): boolean;
}
