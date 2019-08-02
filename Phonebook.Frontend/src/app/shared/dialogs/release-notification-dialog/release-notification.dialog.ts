import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Release Notification Dialog
 * (just for Release Notes)
 */
@Component({
  selector: 'release-notification-dialog',
  templateUrl: './release-notification.dialog.html',
  styleUrls: ['./release-notification.dialog.scss']
})
export class ReleaseNotificationDialog {
  constructor(
    public dialogRef: MatDialogRef<ReleaseNotificationDialog>,
    @Inject(MAT_DIALOG_DATA) public text: string
  ) {}
}
