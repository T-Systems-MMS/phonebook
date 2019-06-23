import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.debug';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReleaseNotificationDialog } from 'src/app/shared/dialogs/release-notification-dialog/release-notification.dialog';
import { VersionIncrement } from 'src/app/shared/models/enumerables/VersionIncrement';
import { Store } from '@ngxs/store';
import { AppState, SetVersion } from 'src/app/shared/states';
import { VERSION } from 'src/environments/version';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Injectable({
  providedIn: 'root'
})
export class ReleaseInfoService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private store: Store, private i18n: I18n) {}

  public checkForUpdate() {
    const versionIncrement = ReleaseInfoService.whatVersionIncrement(
      this.store.selectSnapshot(AppState.version),
      VERSION
    );
    switch (versionIncrement) {
      case VersionIncrement.major:
        this.displayReleaseDialog();
        this.store.dispatch(new SetVersion(VERSION));
        break;
      case VersionIncrement.minor:
        this.store.dispatch(new SetVersion(VERSION));
        this.displayReleaseNotification();
        break;
      case VersionIncrement.patch:
        this.store.dispatch(new SetVersion(VERSION));
        break;
      default:
        break;
    }
  }

  private displayReleaseDialog() {
    this.dialog.open(ReleaseNotificationDialog, {
      height: '90vh',
      width: '90vw'
    });
  }

  private displayReleaseNotification() {
    this.snackBar
      .open(
        this.i18n({
          value: 'We`ve fixed some Bugs and added some new Features for you, with ❤',
          description: 'Snack Bar display for a feature update',
          id: 'ReleaseInfoServiceSnackBarUpdateTitle',
          meaning: 'ReleaseInfoService'
        }),
        this.i18n({
          value: 'Fixed what?',
          description: 'Snack Bar display Action Button for a feature update',
          id: 'ReleaseInfoServiceSnackBarUpdateButton',
          meaning: 'ReleaseInfoService'
        }),
        {
          duration: 8000
        }
      )
      .onAction()
      .subscribe(clicked => {
        window.open('changelog.md', '_blank');
      });
  }

  /**
   *
   * @param previousVersion
   * @param nextVersion
   */
  public static whatVersionIncrement(previousVersion: string, nextVersion: string): VersionIncrement {
    const versionRegex = new RegExp('^(\\d*)\\.(\\d*)\\.(\\d*)$');
    const matchedPreviousVersion = versionRegex.exec(previousVersion);
    const matchedNextVersion = versionRegex.exec(nextVersion);

    if (matchedNextVersion === null || matchedPreviousVersion === null) {
      return VersionIncrement.malformatted;
    }

    const [pMajor, pMinor, pPatch] = matchedPreviousVersion.slice(1, 4);
    const [nMajor, nMinor, nPatch] = matchedNextVersion.slice(1, 4);
    if (Number(pMajor) < Number(nMajor)) {
      return VersionIncrement.major;
    }
    if (Number(pMajor) === Number(nMajor)) {
      if (Number(pMinor) < Number(nMinor)) {
        return VersionIncrement.minor;
      }
      if (Number(pMinor) === Number(nMinor)) {
        if (Number(pPatch) < Number(nPatch)) {
          return VersionIncrement.patch;
        }
      }
    }
    return VersionIncrement.none;
  }
}
