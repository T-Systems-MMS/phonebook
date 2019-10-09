import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { SetDisplayedNotificationVersion } from 'src/app/shared/states';

/**
 * Display Notification Dialog
 * (for Displaying Notification independently from Release Notes)
 */
@Component({
  selector: 'display-notification-dialog',
  templateUrl: './display-notification.dialog.html',
  styleUrls: ['./display-notification.dialog.scss']
})
export class DisplayNotificationDialog implements OnInit, OnDestroy {
  public static version: number = 1;
  constructor(public dialogRef: MatDialogRef<DisplayNotificationDialog>, store: Store) {
    store.dispatch(new SetDisplayedNotificationVersion(DisplayNotificationDialog.version));
  }

  public skipDialoges() {
    window.location.href = window.location.href + '?skip_dialog=true';
  }
  public ngOnInit() {}

  public ngOnDestroy() {}
}
