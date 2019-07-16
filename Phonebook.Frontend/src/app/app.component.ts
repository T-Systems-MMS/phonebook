import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Store } from '@ngxs/store';
import { BugReportConsentComponent } from 'src/app/shared/dialogs/bug-report-consent/bug-report-consent.component';
import { DisplayNotificationDialog } from 'src/app/shared/dialogs/display-notification-dialog/display-notification.dialog';
import { IeWarningComponent } from 'src/app/shared/dialogs/ie-warning/ie-warning.component';
import {
  AppState,
  InitTheme,
  ServiceWorkerNotificationDisplayed,
  SetSendFeedback
} from 'src/app/shared/states/App.state';
import { ReleaseInfoService } from './services/release-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private releaseMigrationService: ReleaseInfoService,
    private store: Store,
    // Commented as long as serviceWorker is reinstalled
    // Issue: https://github.com/T-Systems-MMS/phonebook/issues/87
    // private swUpdates: SwUpdate,
    private matDialog: MatDialog,
    private i18n: I18n,
    private platform: Platform
  ) {}

  public ngOnInit() {
    this.store.dispatch(new InitTheme());
    // Commented as long as serviceWorker is reinstalled
    // Issue: https://github.com/T-Systems-MMS/phonebook/issues/87
    // //Checking if the Service Worker was installed correctly.
    // if (!this.store.selectSnapshot(AppState.serviceWorkerNotificationDisplayed)) {
    //   if ('serviceWorker' in navigator) {
    //     this.swUpdates.activated.subscribe(active => {
    //       if (active.current) {
    //         this.snackBar.open(
    //           this.i18n({
    //             value: 'Hurray! You can use this Website offline.',
    //             description: 'Message indicating the service worker was successfully installed',
    //             id: 'AppComponentServiceWorkerSuccessMessage',
    //             meaning: 'AppComponent'
    //           }),
    //           '',
    //           { duration: 3000 }
    //         );
    //         this.store.dispatch(new ServiceWorkerNotificationDisplayed());
    //       }
    //     });
    //   } else {
    //     this.snackBar.open(
    //       this.i18n({
    //         value: 'Your Browser does not support Offline Apps!',
    //         description: 'Message indicating the service worker was not installed',
    //         id: 'AppComponentServiceWorkerErrorMessage',
    //         meaning: 'AppComponent'
    //       }),
    //       '',
    //       {
    //         duration: 3000
    //       }
    //     );
    //     this.store.dispatch(new ServiceWorkerNotificationDisplayed());
    //   }
    // }

    // // Check if a new Update for the Service worker is available
    // if (this.swUpdates.isEnabled) {
    //   this.swUpdates.available.subscribe(() => {
    //     const updateNotification = this.snackBar.open(
    //       this.i18n({
    //         value: 'A newer version is available. Do you want to update straight away?',
    //         description: 'Message indicating the app can be updated and question if it should be updated',
    //         id: 'AppComponentServiceWorkerUpdateMessage',
    //         meaning: 'AppComponent'
    //       }),
    //       this.i18n({
    //         value: 'Update!',
    //         description: 'Button Text for updating the app',
    //         id: 'AppComponentServiceWorkerUpdateButtonMessage',
    //         meaning: 'AppComponent'
    //       }),
    //       { duration: 4000 }
    //     );
    //     updateNotification.onAction().subscribe(onAction => {
    //       window.location.reload();
    //     });
    //   });
    // }

    // Ask for Permission to send Bug reports
    const test = this.store.selectSnapshot(AppState.sendFeedback);
    if (this.store.selectSnapshot(AppState.sendFeedback) == null) {
      const matDialogRef = this.matDialog.open(BugReportConsentComponent, {
        maxWidth: '50vw',
        maxHeight: '80vh',
        hasBackdrop: true
      });
      matDialogRef.afterClosed().subscribe(consent => {
        this.store.dispatch(new SetSendFeedback(consent));
      });
    }

    if (DisplayNotificationDialog.version > (this.store.selectSnapshot(AppState.displayedNotificationVersion) | 0)) {
      this.matDialog.open(DisplayNotificationDialog, {
        height: '90vh',
        width: '90vw'
      });
    } else {
      // Display the Release Dialog only if no notification Dialog is shown, in order to not overwhelm the user with dialogs.
      this.releaseMigrationService.checkForUpdate();
    }

    //IE Warning
    if (this.platform.TRIDENT === true) {
      this.matDialog.open(IeWarningComponent, {
        panelClass: 'color-warn'
      });
    }
  }
}
