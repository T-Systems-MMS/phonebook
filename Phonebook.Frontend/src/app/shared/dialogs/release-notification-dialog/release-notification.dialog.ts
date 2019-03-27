import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

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
  constructor(public dialogRef: MatDialogRef<ReleaseNotificationDialog>) {}
}
