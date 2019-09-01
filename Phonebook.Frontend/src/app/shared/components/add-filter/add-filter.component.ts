import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { Column } from 'src/app/shared/models';
import { AddSearchFilter, UpdateUrl } from 'src/app/shared/states';

@Component({
  selector: 'app-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.scss']
})
export class AddFilterComponent {
  constructor(private store: Store) {}

  @Input()
  public filterColumn: Column;
  @Input()
  public set filterValue(val: string) {
    if (this.displayText == null || this.setDisplayText) {
      this.setDisplayText = true;
      this.displayText = val;
    }
    this.FILTER_VALUE = val;
  }
  public get filterValue(): string {
    return this.FILTER_VALUE;
  }

  private FILTER_VALUE: string = '';
  @Input()
  public displayText: string;
  @Input()
  public resetSearchTerm: boolean = false;
  private setDisplayText: boolean = false;
  public column: typeof ColumnDefinitions = ColumnDefinitions;

  public addFilter() {
    if (this.resetSearchTerm) {
      this.store.dispatch(new UpdateUrl({ searchTerm: '' }));
    }
    this.store.dispatch(new AddSearchFilter({ filterColumn: this.filterColumn.id, filterValue: this.filterValue }));
  }
}
