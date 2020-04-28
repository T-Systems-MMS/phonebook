import { Column } from 'src/app/shared/models';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';
import { Migration } from 'src/migration/Migration';

const TABLESTATE_KEY: string = 'tablestate';

export const migration5: Migration = {
  name: 'Get presafed column preferences',
  id: 5,
  script: () => {
    const tableStateString = localStorage.getItem(TABLESTATE_KEY);
    if (tableStateString) {
      const tableState: any = JSON.parse(tableStateString);
      if (tableState.visibleBigColumns === undefined) {
        const newTableState = {
          ...tableState,
          visibleBigColumns: [
            'picture',
            'id',
            'fullname',
            'email',
            'phone',
            'mobile',
            'orgUnit',
            'room',
            'city',
            'role',
          ],
          visibleSmallColumns: ['picture', 'id', 'fullname', 'email', 'room', 'role'],
        };
        localStorage.setItem(TABLESTATE_KEY, JSON.stringify(newTableState));
      }
      if (tableState.visibleColumns) {
        const updatedTableState = {
          ...tableState,
          visibleColumns: undefined,
          visibleBigColumns: tableState.visibleColumns,
          visibleSmallColumns: ['picture', 'id', 'fullname', 'email', 'room', 'role'],
        };
        localStorage.setItem(TABLESTATE_KEY, JSON.stringify(updatedTableState));
      }
    }
  },
};
