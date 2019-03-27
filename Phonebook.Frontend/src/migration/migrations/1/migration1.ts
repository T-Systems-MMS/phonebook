import { Migration } from 'src/migration/Migration';
import { Column } from 'src/app/shared/models';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';

const TABLESTATE_KEY: string = 'tablestate';
export const migration1: Migration = {
  name: 'Column "name" to "fullname"',
  id: 1,
  script: () => {
    const tableStateString = localStorage.getItem(TABLESTATE_KEY);
    if (tableStateString) {
      const tableState: {
        visibleColumns: Column[];
      } = JSON.parse(tableStateString);
      if (tableState.visibleColumns) {
        tableState.visibleColumns.forEach(col => {
          if (col.id != null && (col.id as string) === 'name') {
            col.id = ColumnId.fullname;
          }
        });
        localStorage.setItem(TABLESTATE_KEY, JSON.stringify(tableState));
      }
    }
  }
};
