import { Component, OnInit } from '@angular/core';
import { TableSettingsDialog } from 'src/app/modules/table/dialogs/table-settings-dialog/table-settings.dialog';

@Component({
  selector: 'app-table-settings-footer',
  templateUrl: './table-settings-footer.component.html',
  styleUrls: ['./table-settings-footer.component.scss'],
})
export class TableSettingsFooterComponent implements OnInit {
  constructor(public tableSettingsDialog: TableSettingsDialog) {}

  public ngOnInit(): void {}
}
