import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { Column } from 'src/app/shared/models';
import {
  ResetTableSettings,
  SetVisibleTableColumns,
  SetVisibleSmallTableColumns,
  TableState,
  SmallTableState,
} from 'src/app/shared/states';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-table-settings-dialog',
  templateUrl: './table-settings.dialog.html',
  styleUrls: ['./table-settings.dialog.scss'],
})
export class TableSettingsDialog implements OnInit {
  public sizeSmall: boolean;
  public notDisplayedColumns: Column[] = [];
  public displayedColumns: Column[] = [];

  constructor(public store: Store, public breakpointObserver: BreakpointObserver) {}

  public ngOnInit() {
    this.breakpointObserver
      .observe('(max-width: 900px)')
      .pipe(untilComponentDestroyed(this))
      .subscribe((result) => {
        this.sizeSmall = result.matches;
        if (this.sizeSmall) {
          this.displayedColumns = this.store.selectSnapshot(SmallTableState.visibleColumns);
          return this.sizeSmall === true;
        } else {
          this.displayedColumns = this.store.selectSnapshot(TableState.visibleColumns);
          return this.sizeSmall === false;
        }
      });
    this.updateNotDisplayedColumns();
  }

  public updateNotDisplayedColumns() {
    this.notDisplayedColumns = ColumnDefinitions.getAll().filter((col) => {
      return !this.displayedColumns.some((column) => {
        return col.id === column.id;
      });
    });
  }

  public resetTableSettings() {
    this.store.dispatch(new ResetTableSettings());
    if (this.sizeSmall === true) {
      this.displayedColumns = this.store.selectSnapshot(SmallTableState.visibleColumns);
    } else {
      this.displayedColumns = this.store.selectSnapshot(TableState.visibleColumns);
    }
    this.updateNotDisplayedColumns();
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (this.sizeSmall === true) {
      return this.store.dispatch(new SetVisibleSmallTableColumns(this.displayedColumns));
    } else {
      return this.store.dispatch(new SetVisibleTableColumns(this.displayedColumns));
    }
  }
  public ngOnDestroy() {}
}
