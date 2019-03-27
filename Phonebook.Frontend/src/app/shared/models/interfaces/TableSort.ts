import { Column } from './Column';
import { PhonebookSortDirection } from 'src/app/shared/models/enumerables/PhonebookSortDirection';

export interface TableSort {
  column: Column | null;
  direction: PhonebookSortDirection;
}
