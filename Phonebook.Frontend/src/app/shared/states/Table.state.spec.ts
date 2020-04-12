import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';
import { SetVisibleTableColumns, TableState } from 'src/app/shared/states';
import { SetTableResultCount } from 'src/app/shared/states/Table.state';

describe('[States] Table', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TableState])],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  // Selectors
  it('it should return search Filters', () => {
    expect(
      TableState.visibleColumns({
        visibleColumns: [],
        resultCount: 0,
      })
    ).toEqual([]);
    expect(
      TableState.visibleColumns({
        visibleColumns: [ColumnId.building],
        resultCount: 0,
      })
    ).toEqual([ColumnDefinitions.building]);
  });

  it('it should return search Table Result Count', () => {
    expect(
      TableState.resultCount({
        visibleColumns: [],
        resultCount: 0,
      })
    ).toEqual(0);
    expect(
      TableState.resultCount({
        visibleColumns: [ColumnId.building],
        resultCount: 15,
      })
    ).toEqual(15);
  });

  // Actions
  it('it sets Visible Tables Columns', () => {
    expect(
      store.selectSnapshot((storeSnapshot) => storeSnapshot.tablestate.visibleColumns)
    ).toEqual([
      ColumnId.picture,
      ColumnId.id,
      ColumnId.fullname,
      ColumnId.email,
      ColumnId.phone,
      ColumnId.mobile,
      ColumnId.orgUnit,
      ColumnId.room,
      ColumnId.city,
      ColumnId.role,
    ]);
    store.dispatch(new SetVisibleTableColumns([ColumnDefinitions.building]));
    expect(
      store.selectSnapshot((storeSnapshot) => storeSnapshot.tablestate.visibleColumns)
    ).toEqual([ColumnId.building]);
    store.dispatch(new SetVisibleTableColumns([ColumnDefinitions.role, ColumnDefinitions.picture]));
    expect(
      store.selectSnapshot((storeSnapshot) => storeSnapshot.tablestate.visibleColumns)
    ).toEqual([ColumnId.role, ColumnId.picture]);
  });

  it('it sets Table Result Count', () => {
    expect(store.selectSnapshot((storeSnapshot) => storeSnapshot.tablestate.resultCount)).toEqual(
      0
    );
    store.dispatch(new SetTableResultCount(15));
    expect(store.selectSnapshot((storeSnapshot) => storeSnapshot.tablestate.resultCount)).toEqual(
      15
    );
    store.dispatch(new SetTableResultCount(0));
    expect(store.selectSnapshot((storeSnapshot) => storeSnapshot.tablestate.resultCount)).toEqual(
      0
    );
  });
});
