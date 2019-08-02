import { PhonebookSortDirection } from 'src/app/shared/models/enumerables/PhonebookSortDirection';
import { Column } from './Column';

export interface TableSort {
  column: Column | null;
  direction: PhonebookSortDirection;
}
