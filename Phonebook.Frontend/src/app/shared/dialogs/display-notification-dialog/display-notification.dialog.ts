import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { SetDisplayedNotificationVersion } from 'src/app/shared/states';
import { Router } from '@angular/router';

/**
 * Display Notification Dialog
 * (for Displaying Notification independently from Release Notes)
 */
@Component({
  selector: 'display-notification-dialog',
  templateUrl: './display-notification.dialog.html',
  styleUrls: ['./display-notification.dialog.scss'],
})
export class DisplayNotificationDialog implements OnInit, OnDestroy {
  public static version: number = 1;
  constructor(
    public dialogRef: MatDialogRef<DisplayNotificationDialog>,
    store: Store,
    private router: Router
  ) {
    store.dispatch(new SetDisplayedNotificationVersion(DisplayNotificationDialog.version));
  }
  public skipStartDialogs() {
    this.router.navigateByUrl('/?skip_dialog=true');
    this.dialogRef.close();
  }
  public ngOnInit() {}

  public ngOnDestroy() {}
}
