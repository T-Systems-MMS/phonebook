import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { Column } from 'src/app/shared/models';
import {
  ResetTableSettings,
  SetVisibleBigTableColumns,
  SetVisibleSmallTableColumns,
  TableState,
} from 'src/app/shared/states';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-table-settings-dialog',
  templateUrl: './table-settings.dialog.html',
  styleUrls: ['./table-settings.dialog.scss'],
})
export class TableSettingsDialog implements OnInit {
  public isSizeSmall: boolean;
  public notDisplayedColumns: Column[] = [];
  public displayedColumns: Column[] = [];

  constructor(public store: Store, public breakpointObserver: BreakpointObserver) {}

  public ngOnInit() {
    this.breakpointObserver
      .observe('(max-width: 900px)')
      .pipe(untilComponentDestroyed(this))
      .subscribe((result) => {
        this.isSizeSmall = result.matches;
        if (this.isSizeSmall) {
          this.displayedColumns = this.store.selectSnapshot(TableState.visibleSmallColumns);
        } else {
          this.displayedColumns = this.store.selectSnapshot(TableState.visibleBigColumns);
        }
        this.updateNotDisplayedColumns();
      });
  }

  private updateNotDisplayedColumns() {
    this.notDisplayedColumns = ColumnDefinitions.getAll().filter((col) => {
      return !this.displayedColumns.some((column) => {
        return col.id === column.id;
      });
    });
  }

  public resetTableSettings() {
    this.store.dispatch(new ResetTableSettings());
    if (this.isSizeSmall === true) {
      this.displayedColumns = this.store.selectSnapshot(TableState.visibleSmallColumns);
    } else {
      this.displayedColumns = this.store.selectSnapshot(TableState.visibleBigColumns);
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
    if (this.isSizeSmall === true) {
      return this.store.dispatch(new SetVisibleSmallTableColumns(this.displayedColumns));
    } else {
      return this.store.dispatch(new SetVisibleBigTableColumns(this.displayedColumns));
    }
  }
  public ngOnDestroy() {}
}
