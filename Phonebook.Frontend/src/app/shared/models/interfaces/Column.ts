/* tslint:disable:variable-name */
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';
import { PhonebookSortDirection } from 'src/app/shared/models/enumerables/PhonebookSortDirection';
import { Person } from '../classes/Person';

export interface Column {
  id: ColumnId;
  // TODO: Localization
  // If Angular i18n ever supports translations in .ts files this should be used again.
  // title: string;
  rank: number;
  filterable: boolean;
  sortable: boolean;
  fullMatchFilter: boolean;
  sortFunction(a: Person, b: Person, sortDirection: PhonebookSortDirection): number;
  /**
   * Returns true if the attribute of the person matches with the filterString.
   * @param filterString Normalized String RegExp (with {@link TableLogic.prepareSearchString()}).
   * @param person The Person to test.
   */
  filterFunction(filterString: RegExp, person: Person): boolean;
}
