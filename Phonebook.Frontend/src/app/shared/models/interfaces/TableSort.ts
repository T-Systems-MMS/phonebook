import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';
import { PhonebookSortDirection } from 'src/app/shared/models/enumerables/PhonebookSortDirection';

export interface TableSort {
  column: ColumnId;
  direction: PhonebookSortDirection;
}
