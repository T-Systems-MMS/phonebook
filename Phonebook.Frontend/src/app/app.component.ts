import { Platform } from '@angular/cdk/platform';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationError, Router, ActivatedRoute } from '@angular/router';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';
import { BugReportConsentComponent } from 'src/app/shared/dialogs/bug-report-consent/bug-report-consent.component';
import { DisplayNotificationDialog } from 'src/app/shared/dialogs/display-notification-dialog/display-notification.dialog';
import { IeWarningComponent } from 'src/app/shared/dialogs/ie-warning/ie-warning.component';
import { AppState, InitTheme, SetSendFeedback, SetDisplayedNotificationVersion } from 'src/app/shared/states/App.state';
import { ReleaseInfoService } from './services/release-info.service';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { LoginHelper } from 'src/app/shared/login/login.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  //get url params
  private urlParams: URLSearchParams = new URLSearchParams(window.location.search);
  private skippedDialogs: boolean = this.urlParams.get('skip_dialog') === 'true';
  constructor(
    private snackBar: MatSnackBar,
    private releaseMigrationService: ReleaseInfoService,
    private store: Store,
    // Commented as long as serviceWorker is reinstalled
    // Issue: https://github.com/T-Systems-MMS/phonebook/issues/87
    // private swUpdates: SwUpdate,
    private matDialog: MatDialog,
    private platform: Platform,
    private router: Router,
    private i18n: I18n,
    private activatedRoute: ActivatedRoute
  ) {}
  public ngOnInit() {
    LoginHelper.EnsureNavigationToStoredLocation();
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

    //if skip_cookies is set, dont show dialogs
    if (this.skippedDialogs) {
      this.store.dispatch(new SetDisplayedNotificationVersion(DisplayNotificationDialog.version));
    }
    //subscribe on query param changes, if changed open snackbar
    this.activatedRoute.queryParamMap.pipe(untilComponentDestroyed(this)).subscribe(queryParamMap => {
      if (queryParamMap.get('skip_dialog') === 'true') {
        if (!this.skippedDialogs) {
          this.openJustSkippedDialogsSnackBar();
        } else {
          this.openSkippedDialogsSnackBar();
        }
      }
    });

    // Ask for Permission to send Bug reports, don't show dialog if dialogs should be skipped
    if (
      this.store.selectSnapshot(AppState.sendFeedback) == null &&
      runtimeEnvironment.ravenURL != null &&
      !this.skippedDialogs
    ) {
      const matDialogRef = this.matDialog.open(BugReportConsentComponent, {
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
    } else if (!this.skippedDialogs) {
      // Display the Release Dialog only if no notification Dialog is shown, in order to not overwhelm the user with dialogs.
      this.releaseMigrationService.checkForUpdate();
    }

    //IE Warning
    if (this.platform.TRIDENT === true) {
      this.matDialog.open(IeWarningComponent, {
        panelClass: 'color-warn'
      });
    }

    // Route Routes with failing Resolvers to the Main Page
    this.router.events.pipe(filter(e => e instanceof NavigationError)).subscribe(e => {
      this.router.navigateByUrl('/');
    });
  }
  public openJustSkippedDialogsSnackBar() {
    this.snackBar
      .open(
        this.i18n({
          meaning: 'Display advice to new url',
          description: 'Message for just set no cookie url',
          id: 'PageInformationNewUrlNoCookies',
          value: `Save the site URL as a favourite now in order to not get any more startup-dialogs. Please notice: You won't get any information about updates or releases with the set url parameter.`
        }),
        this.i18n({
          meaning: 'Restore Url',
          description: 'Message for following no cookie url',
          id: 'PageInformationNewUrlNoCookiesUrl',
          value: 'Reset'
        }),
        { duration: 8000 }
      )
      .onAction()
      .subscribe(() => {
        //remove url parameter and close snackbar
        this.router.navigateByUrl('/');
      });
  }
  public openSkippedDialogsSnackBar() {
    this.snackBar
      .open(
        this.i18n({
          meaning: 'Warning no dialogs are shown',
          description: 'Message to inform user that no dialogs will be shown',
          id: 'PageInformationNoDialogs',
          value: `Startup-Dialogs are deactivated. Please notice: You won't get any information about updates or releases.`
        }),
        this.i18n({
          meaning: 'Restore Url',
          description: 'Message for following no cookie url',
          id: 'PageInformationNewUrlNoCookiesUrl',
          value: 'Reset'
        }),
        { duration: 8000 }
      )
      .onAction()
      .subscribe(() => {
        //remove url parameter and close snackbar
        this.router.navigateByUrl('/');
      });
  }
  public ngOnDestroy() {}
}
