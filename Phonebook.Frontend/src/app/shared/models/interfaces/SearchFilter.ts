import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';

export interface SearchFilter {
  filterColumn: ColumnId;
  filterValue: string;
}
