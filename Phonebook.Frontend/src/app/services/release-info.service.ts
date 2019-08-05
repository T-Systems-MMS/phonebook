import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Store } from '@ngxs/store';
import { ReleaseNotificationDialog } from 'src/app/shared/dialogs/release-notification-dialog/release-notification.dialog';
import { VersionIncrement } from 'src/app/shared/models/enumerables/VersionIncrement';
import { AppState, SetVersion } from 'src/app/shared/states';
import { VERSION } from 'src/environments/version';

@Injectable({
  providedIn: 'root'
})
export class ReleaseInfoService {
  public newUpdate: boolean = false; //shows that the application was updated
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store,
    private i18n: I18n,
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
      case VersionIncrement.feature || VersionIncrement.bugfix:
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
    this.httpClient
      .get('changelog.md', {
        responseType: 'text'
      })
      .subscribe(success => {
        import('marked').then(marked => {
          text = marked.parse(success);
          this.dialog.open(ReleaseNotificationDialog, {
            data: text,
            height: '90vh',
            width: '90vw'
          });
        });
      });
  }

  public displayReleaseNotification() {
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
