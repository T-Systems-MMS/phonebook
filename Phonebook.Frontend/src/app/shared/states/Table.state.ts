import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  ColumnDefinitions,
  getColumnsAsStringArray,
} from 'src/app/shared/config/columnDefinitions';
import { Column } from 'src/app/shared/models';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';
import { Injectable } from '@angular/core';

export class SetVisibleTableColumns {
  public static readonly type: string = '[Table State] Set visible Table Columns';
  constructor(public columns: Column[]) {}
}
export class SetVisibleSmallTableColumns {
  public static readonly type: string = '[Table State] Set visible Table Columns';
  constructor(public columns: Column[]) {}
}

export class ResetTableSettings {
  public static readonly type: string = '[Table State] Reset Table Settings';
}

export class SetTableResultCount {
  public static readonly type: string = '[Table State] Set Table Result Count';
  constructor(public resultCount: number) {}
}

export interface TableStateModel {
  visibleColumns: ColumnId[];
  resultCount: number;
}

export interface SmallTableStateModel {
  visibleColumns: ColumnId[];
  resultCount: number;
}

@State<TableStateModel>({
  name: 'tablestate',
  defaults: {
    visibleColumns: getColumnsAsStringArray(ColumnDefinitions.getDefault()),
    resultCount: 0,
  },
})
@Injectable()
export class TableState {
  @Selector()
  public static visibleColumns(state: TableStateModel): Column[] {
    return state.visibleColumns.map((col) => {
      const tmp = ColumnDefinitions.getAll().find((c) => {
        return c.id === col;
      });
      if (tmp == null) {
        throw Error('TableState: Column with ID:' + col + ') not found.');
      }
      return tmp;
    });
  }

  @Selector()
  public static resultCount(state: TableStateModel): number {
    return state.resultCount;
  }

  @Action(SetVisibleTableColumns)
  public setVisibleTableColumns(
    ctx: StateContext<TableStateModel>,
    action: SetVisibleTableColumns
  ) {
    const state = ctx.getState();
    ctx.setState({ ...state, visibleColumns: action.columns.map((col) => col.id) });
  }

  @Action(ResetTableSettings)
  public resetTableSettings(ctx: StateContext<TableStateModel>) {
    const state = ctx.getState();
    state.visibleColumns = getColumnsAsStringArray(ColumnDefinitions.getDefault());
    ctx.setState({ ...state });
  }

  @Action(SetTableResultCount)
  public setTableResultCount(ctx: StateContext<TableStateModel>, action: SetTableResultCount) {
    ctx.patchState({ resultCount: action.resultCount });
  }
}

@State<SmallTableStateModel>({
  name: 'smalltablestate',
  defaults: {
    visibleColumns: getColumnsAsStringArray(ColumnDefinitions.getSmall()),
    resultCount: 0,
  },
})
@Injectable()
export class SmallTableState {
  @Selector()
  public static visibleColumns(state: SmallTableStateModel): Column[] {
    return state.visibleColumns.map((col) => {
      const tmp = ColumnDefinitions.getAll().find((c) => {
        return c.id === col;
      });
      if (tmp == null) {
        throw Error('TableState: Column with ID:' + col + ') not found.');
      }
      return tmp;
    });
  }

  @Selector()
  public static resultCount(state: SmallTableStateModel): number {
    return state.resultCount;
  }

  @Action(SetVisibleSmallTableColumns)
  public setVisibleTableColumns(
    ctx: StateContext<SmallTableStateModel>,
    action: SetVisibleTableColumns
  ) {
    const state = ctx.getState();
    ctx.setState({ ...state, visibleColumns: action.columns.map((col) => col.id) });
  }

  @Action(ResetTableSettings)
  public resetTableSettings(ctx: StateContext<SmallTableStateModel>) {
    const state = ctx.getState();
    state.visibleColumns = getColumnsAsStringArray(ColumnDefinitions.getSmall());
    ctx.setState({ ...state });
  }

  @Action(SetTableResultCount)
  public setTableResultCount(ctx: StateContext<SmallTableStateModel>, action: SetTableResultCount) {
    ctx.patchState({ resultCount: action.resultCount });
  }
}
