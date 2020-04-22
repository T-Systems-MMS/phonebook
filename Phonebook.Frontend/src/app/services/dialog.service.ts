import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsComponent } from 'src/app/dialogs/dialogs.component';
import { DialogItem } from 'src/app/dialogs/dialog-item';
import { ReleaseNotificationDialog } from 'src/app/shared/dialogs/release-notification-dialog/release-notification.dialog';
import { BugReportConsentComponent } from 'src/app/shared/dialogs/bug-report-consent/bug-report-consent.component';
import { FeedbackDrawerSheetComponent } from 'src/app/shared/directives/feedback-drawer/feedback-drawer-sheet/feedback-drawer-sheet.component';
import { DisplayNotificationDialog } from 'src/app/shared/dialogs/display-notification-dialog/display-notification.dialog';
import { Store } from '@ngxs/store';
import { SetSendFeedback } from 'src/app/shared/states/App.state';
import { ProfilePictureEnlargeDialog } from 'src/app/modules/profile-picture/components/profile-picture/enlarge-dialog/profile-picture-enlarge.dialog';
import { IeWarningComponent } from 'src/app/shared/dialogs/ie-warning/ie-warning.component';
import { IncorrectUserInformationComponent } from 'src/app/shared/dialogs/user-information/incorrect-user-information.component';
import { LOCALE_ID, Inject } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private store: Store,
    @Inject(LOCALE_ID) public locale: string
  ) {}
  public displayDialog(item: string, inputData?: any) {
    const dialogConfig = new MatDialogConfig();
    let translatedTitle: string;
    dialogConfig.maxWidth = '90%';
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = ['mat-dialog-overwrite', 'mat-typography'];

    switch (item) {
      case 'release-notes':
        if ((this.locale = 'de')) {
          translatedTitle = 'Wir haben zu einer neuen Version geupdated!';
        } else {
          translatedTitle = "We've updated to a newer Version!";
        }
        dialogConfig.data = {
          title: translatedTitle,
          content: new DialogItem(ReleaseNotificationDialog),
        };
        this.dialog.open(DialogsComponent, dialogConfig);
        break;

      case 'feedback':
        if ((this.locale = 'de')) {
          translatedTitle = 'Sage deine Meinung, melde einen Fehler oder erzähle von deiner Idee';
        } else {
          translatedTitle = 'Leave Feedback, report a Bug or suggest a new Idea';
        }
        dialogConfig.data = {
          title: translatedTitle,
          content: new DialogItem(FeedbackDrawerSheetComponent),
        };
        this.dialog.open(DialogsComponent, dialogConfig);
        break;

      case 'notification':
        if ((this.locale = 'de')) {
          translatedTitle = 'Willkommen beim neuen Phonebook!';
        } else {
          translatedTitle = 'Welcome to the new Phonebook!';
        }
        dialogConfig.data = {
          title: translatedTitle,
          content: new DialogItem(DisplayNotificationDialog),
        };
        this.dialog.open(DialogsComponent, dialogConfig);
        break;

      case 'bug-report-consent':
        if ((this.locale = 'de')) {
          translatedTitle = 'Wir brauchen deine Hilfe!';
        } else {
          translatedTitle = 'We need your help!';
        }
        dialogConfig.data = {
          title: translatedTitle,
          content: new DialogItem(BugReportConsentComponent),
        };
        const matDialogRef = this.dialog.open(DialogsComponent, dialogConfig);
        matDialogRef.afterClosed().subscribe((consent) => {
          this.store.dispatch(new SetSendFeedback(consent));
        });
        break;

      case 'profile-picture':
        dialogConfig.data = {
          title: inputData[1],
          content: new DialogItem(ProfilePictureEnlargeDialog),
          inputData: {
            imageUrl: inputData[0],
            text: inputData[1],
          },
        };
        this.dialog.open(DialogsComponent, dialogConfig);
        break;

      case 'ie-warning':
        if ((this.locale = 'de')) {
          translatedTitle =
            'Diese Website funktioniert eventuell nicht richtig im Internet Explorer';
        } else {
          translatedTitle = 'This Website may not function properly in Internet Explorer';
        }
        dialogConfig.data = {
          title: translatedTitle,
          content: new DialogItem(IeWarningComponent),
        };
        dialogConfig.panelClass = 'color-warn';
        this.dialog.open(DialogsComponent, dialogConfig);
        break;

      case 'incorrect-user-information':
        if ((this.locale = 'de')) {
          translatedTitle = 'Benutzerinformation';
        } else {
          translatedTitle = 'Incorrect User Information';
        }
        dialogConfig.data = {
          title: translatedTitle,
          content: new DialogItem(IncorrectUserInformationComponent),
          inputData: inputData,
        };
        this.dialog.open(DialogsComponent, dialogConfig);
        break;
    }
  }
  public closeDialog() {
    this.dialog.closeAll();
  }
}
