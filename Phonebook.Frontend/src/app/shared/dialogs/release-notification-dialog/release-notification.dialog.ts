import { Component, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

/**
 * Release Notification Dialog
 * (just for Release Notes)
 */
@Component({
  selector: 'release-notification-dialog',
  templateUrl: './release-notification.dialog.html',
  styleUrls: ['./release-notification.dialog.scss'],
})
export class ReleaseNotificationDialog {
  text: string;
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<ReleaseNotificationDialog>
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http
      .get('changelog.md', {
        responseType: 'text',
      })
      .subscribe((success) => {
        import('marked').then((marked) => {
          this.text = marked.parse(success);
        });
      });
  }
}
