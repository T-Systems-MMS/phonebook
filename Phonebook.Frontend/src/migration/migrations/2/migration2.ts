import { Column } from 'src/app/shared/models';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';
import { Migration } from 'src/migration/Migration';

const TABLESTATE_KEY: string = 'tablestate';
export const migration2: Migration = {
  name: 'TableState Object based Array to ColumnId based Array',
  id: 2,
  script: () => {
    const tableStateString = localStorage.getItem(TABLESTATE_KEY);
    if (tableStateString) {
      const tableState: {
        visibleColumns: Column[];
      } = JSON.parse(tableStateString);
      if (tableState.visibleColumns) {
        // Test if visibleColumns is really a Column Object
        if (tableState.visibleColumns[0].id != null) {
          const newTableState: {
            visibleColumns: ColumnId[];
          } = {
            visibleColumns: [],
          };
          newTableState.visibleColumns = tableState.visibleColumns.map((col) => col.id);
          localStorage.setItem(TABLESTATE_KEY, JSON.stringify(newTableState));
        }
      }
    }
  },
};
