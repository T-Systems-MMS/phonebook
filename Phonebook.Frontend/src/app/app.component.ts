import { Platform } from '@angular/cdk/platform';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationError, Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngxs/store';
import { filter } from 'rxjs/operators';
import { BugReportConsentComponent } from 'src/app/shared/dialogs/bug-report-consent/bug-report-consent.component';
import { DisplayNotificationDialog } from 'src/app/shared/dialogs/display-notification-dialog/display-notification.dialog';
import { IeWarningComponent } from 'src/app/shared/dialogs/ie-warning/ie-warning.component';
import {
  AppState,
  InitTheme,
  SetTheme,
  SetSendFeedback,
  SetDisplayedNotificationVersion
} from 'src/app/shared/states/App.state';
import { ReleaseInfoService } from './services/release-info.service';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';
import { Theme } from 'src/app/shared/models/enumerables/Theme';

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
    public featureFlagService: FeatureFlagService,
    private activatedRoute: ActivatedRoute
  ) {}
  public ngOnInit() {
    this.store.dispatch(new InitTheme());
    this.featureFlagService
      .get('firstApril')
      .pipe(untilComponentDestroyed(this))
      .subscribe(flag => {
        if (flag) {
          this.store.dispatch(new SetTheme(Theme.unicorn_theme));
        }
      });
    // Commented as long as serviceWorker is reinstalled
    // Issue: https://github.com/T-Systems-MMS/phonebook/issues/87
    // //Checking if the Service Worker was installed correctly.
    // if (!this.store.selectSnapshot(AppState.serviceWorkerNotificationDisplayed)) {
    //   if ('serviceWorker' in navigator) {
    //     this.swUpdates.activated.subscribe(active => {
    //       if (active.current) {
    //         this.snackBar.open(
    //           $localize`:AppComponent|Message indicating the service worker was successfully installed@@AppComponentServiceWorkerSuccessMessage:Hurray! You can use this Website offline.`,
    //           '',
    //           { duration: 3000 }
    //         );
    //         this.store.dispatch(new ServiceWorkerNotificationDisplayed());
    //       }
    //     });
    //   } else {
    //     this.snackBar.open(
    //       $localize`:AppComponent|Message indicating the service worker was not installed@@AppComponentServiceWorkerErrorMessage:Your Browser does not support Offline Apps!`,
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
    //       $localize`:AppComponent|Message indicating the app can be updated and question if it should be updated@@AppComponentServiceWorkerUpdateMessage:A newer version is available. Do you want to update straight away?`,
    //       $localize`:AppComponent|Button Text for updating the app@@AppComponentServiceWorkerUpdateButtonMessage:Update!`,
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
        $localize`:Display advice to new url|Message for just set no cookie url@@PageInformationNewUrlNoCookies:Save the site URL as a favourite now in order to not get any more startup-dialogs. Please notice: You won't get any information about updates or releases with the set url parameter.`,
        $localize`:Restore Url|Message for following no cookie url@@PageInformationNewUrlNoCookiesUrl:Reset`,
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
        $localize`:Warning no dialogs are shown|Message to inform user that no dialogs will be shown@@PageInformationNoDialogs:Startup-Dialogs are deactivated. Please notice: You won't get any information about updates or releases.`,
        $localize`:Restore Url|Message for following no cookie url@@PageInformationNewUrlNoCookiesUrl:Reset`,
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
