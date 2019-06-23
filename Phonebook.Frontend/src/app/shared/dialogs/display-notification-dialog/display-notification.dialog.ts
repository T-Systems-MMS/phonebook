import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetDisplayedNotificationVersion } from 'src/app/shared/states';
import { Person } from 'src/app/shared/models';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { CurrentUserService } from 'src/app/services/api/current-user.service';

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
  constructor(
    public dialogRef: MatDialogRef<DisplayNotificationDialog>,
    store: Store
  ) {
    store.dispatch(new SetDisplayedNotificationVersion(DisplayNotificationDialog.version));
  }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}
