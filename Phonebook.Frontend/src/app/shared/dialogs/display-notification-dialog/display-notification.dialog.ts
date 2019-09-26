import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { SetDisplayedNotificationVersion } from 'src/app/shared/states';
import { MatSnackBar } from '@angular/material/snack-bar';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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
    store: Store,
    private router: Router,
    private snackBar: MatSnackBar,
    private i18n: I18n,
    private sanitizer: DomSanitizer
  ) {
    store.dispatch(new SetDisplayedNotificationVersion(DisplayNotificationDialog.version));
  }

  public openSnackBar() {
    const url = this.sanitizer.bypassSecurityTrustHtml(
      '<a href="' + window.location.href + '?skip_dialog=true">Link</a>'
    );
    const snackBarRef = this.snackBar
      .open(
        this.i18n({
          meaning: 'Display-New-Url-Advice',
          description: 'Message for new no cookie url',
          id: 'PageInformationNewUrlNoCookies',
          value:
            'Add skip_dialog=true as parameter to url for skipping start dialogs if cookies are deleted after each session.'
        }),
        this.i18n({
          meaning: 'Go-to-New-Url-Advice',
          description: 'Message for following no cookie url',
          id: 'PageInformationNewUrlNoCookiesUrl',
          value: 'Go to Url'
        }),
        { duration: 6000 }
      )
      .onAction()
      .subscribe(() => {
        this.router.navigateByUrl('/?skip_dialog=true');
        console.log(window.location);
        window.location.href = window.location.href + '?skip_dialog=true';
        console.log(window.location.href);
        //window.location.reload();
      });
  }

  public ngOnInit() {}

  public ngOnDestroy() {}
}
