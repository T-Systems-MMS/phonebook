import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Store } from '@ngxs/store';
import { ReleaseNotificationDialog } from 'src/app/shared/dialogs/release-notification-dialog/release-notification.dialog';
import { VersionIncrement } from 'src/app/shared/models/enumerables/VersionIncrement';
import { AppState, SetVersion } from 'src/app/shared/states';
import { VERSION } from 'src/environments/version';

@Injectable({
  providedIn: 'root',
})
export class ReleaseInfoService {
  public newUpdate: boolean = false; //shows that the application was updated
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store,

    private httpClient: HttpClient
  ) {}

  public checkForUpdate() {
    const versionIncrement = ReleaseInfoService.whatVersionIncrement(
      this.store.selectSnapshot(AppState.version),
      VERSION
    );
    switch (versionIncrement) {
      case VersionIncrement.breaking:
        this.displayReleaseDialog();
        this.newUpdate = true;
        this.store.dispatch(new SetVersion(VERSION));
        break;
      case VersionIncrement.feature:
        this.displayReleaseNotification();
        this.newUpdate = true;
        this.store.dispatch(new SetVersion(VERSION));
        break;
      case VersionIncrement.bugfix:
        this.displayReleaseNotification();
        this.newUpdate = true;
        this.store.dispatch(new SetVersion(VERSION));
        break;
      default:
        break;
    }
  }

  public displayReleaseDialog() {
    let text = 'Changelog could not be loaded.';
    this.newUpdate = false;
    this.httpClient
      .get('changelog.md', {
        responseType: 'text',
      })
      .subscribe((success) => {
        import('markdown-it').then((markdownit) => {
          text = markdownit.default().render(success);
          this.dialog.open(ReleaseNotificationDialog, {
            data: text,
            height: '90vh',
            width: '90vw',
          });
        });
      });
  }

  private displayReleaseNotification() {
    this.snackBar
      .open(
        $localize`:ReleaseInfoService|Snack Bar display for a feature update@@ReleaseInfoServiceSnackBarUpdateTitle:We've fixed some Bugs and added some new Features for you, with ❤`,
        $localize`:ReleaseInfoService|Snack Bar display Action Button for a feature update@@ReleaseInfoServiceSnackBarUpdateButton:Fixed what?`,
        {
          duration: 8000,
        }
      )
      .onAction()
      .subscribe((clicked) => {
        this.displayReleaseDialog();
      });
  }

  /**
   *
   * @param previousVersion
   * @param nextVersion
   */
  public static whatVersionIncrement(
    previousVersion: string,
    nextVersion: string
  ): VersionIncrement {
    const versionRegex = new RegExp('^(\\d*)\\.(\\d*)\\.(\\d*)$');
    const matchedPreviousVersion = versionRegex.exec(previousVersion);
    const matchedNextVersion = versionRegex.exec(nextVersion);

    if (matchedNextVersion === null || matchedPreviousVersion === null) {
      return VersionIncrement.malformatted;
    }

    const [pMajor, pMinor, pPatch] = matchedPreviousVersion.slice(1, 4);
    const [nMajor, nMinor, nPatch] = matchedNextVersion.slice(1, 4);
    if (Number(pMajor) < Number(nMajor)) {
      return VersionIncrement.breaking;
    }
    if (Number(pMajor) === Number(nMajor)) {
      if (Number(pMinor) < Number(nMinor)) {
        return VersionIncrement.feature;
      }
      if (Number(pMinor) === Number(nMinor)) {
        if (Number(pPatch) < Number(nPatch)) {
          return VersionIncrement.bugfix;
        }
      }
    }
    return VersionIncrement.none;
  }
}
