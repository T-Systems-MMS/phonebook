import { Column } from './Column';

export interface SearchFilter {
  filterColumn: Column;
  filterValue: string;
}
