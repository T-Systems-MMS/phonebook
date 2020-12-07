import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  ColumnDefinitions,
  getColumnsAsStringArray,
} from 'src/app/shared/config/columnDefinitions';
import { Column } from 'src/app/shared/models';
import { ColumnId } from 'src/app/shared/models/enumerables/ColumnId';
import { Injectable } from '@angular/core';

export class SetVisibleBigTableColumns {
  public static readonly type: string = '[Table State] Set visible Table Big Columns';
  constructor(public columns: Column[]) {}
}
export class SetVisibleSmallTableColumns {
  public static readonly type: string = '[Table State] Set visible Table Small Columns';
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
  visibleBigColumns: ColumnId[];
  visibleSmallColumns: ColumnId[];
  resultCount: number;
}

@State<TableStateModel>({
  name: 'tablestate',
  defaults: {
    visibleBigColumns: getColumnsAsStringArray(ColumnDefinitions.getBigDefault()),
    visibleSmallColumns: getColumnsAsStringArray(ColumnDefinitions.getSmallDefault()),
    resultCount: 0,
  },
})
@Injectable()
export class TableState {
  @Selector()
  public static visibleBigColumns(state: TableStateModel): Column[] {
    return state.visibleBigColumns.map((col) => {
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
  public static visibleSmallColumns(state: TableStateModel): Column[] {
    return state.visibleSmallColumns.map((col) => {
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

  @Action(SetVisibleBigTableColumns)
  public setVisibleBigTableColumns(
    ctx: StateContext<TableStateModel>,
    action: SetVisibleBigTableColumns
  ) {
    const state = ctx.getState();
    ctx.setState({ ...state, visibleBigColumns: action.columns.map((col) => col.id) });
  }

  @Action(SetVisibleSmallTableColumns)
  public setVisibleSmallTableColumns(
    ctx: StateContext<TableStateModel>,
    action: SetVisibleSmallTableColumns
  ) {
    const state = ctx.getState();
    ctx.setState({ ...state, visibleSmallColumns: action.columns.map((col) => col.id) });
  }

  @Action(ResetTableSettings)
  public resetTableSettings(ctx: StateContext<TableStateModel>) {
    const state = ctx.getState();
    state.visibleBigColumns = getColumnsAsStringArray(ColumnDefinitions.getBigDefault());
    state.visibleSmallColumns = getColumnsAsStringArray(ColumnDefinitions.getSmallDefault());
    ctx.setState({ ...state });
  }

  @Action(SetTableResultCount)
  public setTableResultCount(ctx: StateContext<TableStateModel>, action: SetTableResultCount) {
    ctx.patchState({ resultCount: action.resultCount });
  }
}
