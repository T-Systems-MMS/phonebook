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
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private store: Store
  ) {}
  public displayDialog(item: string, inputData?: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.maxHeight = '90vh';
    dialogConfig.maxWidth = '120vh';
    dialogConfig.hasBackdrop = true;
    dialogConfig.panelClass = ['mat-dialog-overwrite', 'mat-typography'];

    switch (item) {
      case 'release-notes':
        dialogConfig.data = {
          title: "We've updated to a newer Version!",
          content: new DialogItem(ReleaseNotificationDialog)
        };
        this.dialog.open(DialogsComponent, dialogConfig);
        break;

      case 'feedback':
        dialogConfig.data = {
          title: 'Leave Feedback, report a Bug or suggest a new Idea',
          content: new DialogItem(FeedbackDrawerSheetComponent)
        };
        this.dialog.open(DialogsComponent, dialogConfig);
        break;

      case 'notification':
        dialogConfig.data = {
          title: 'Welcome to the new Phonebook!',
          content: new DialogItem(DisplayNotificationDialog)
        };
        this.dialog.open(DialogsComponent, dialogConfig);
        break;

      case 'bug-report-consent':
        dialogConfig.data = {
          title: 'We need your help!',
          content: new DialogItem(BugReportConsentComponent)
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
            text: inputData[1]
          }
        };
        this.dialog.open(DialogsComponent, dialogConfig);
        break;

      case 'ie-warning':
        dialogConfig.data = {
          title: 'This Website may not function properly in Internet Explorer',
          content: new DialogItem(IeWarningComponent)
        };
        dialogConfig.panelClass = 'color-warn';
        this.dialog.open(DialogsComponent, dialogConfig);
        break;

      case 'incorrect-user-information':
        dialogConfig.data = {
          title: 'Incorrect User Information',
          content: new DialogItem(IncorrectUserInformationComponent),
          inputData: inputData
        };
        this.dialog.open(DialogsComponent, dialogConfig);
        break;
    }
  }
  public closeDialog() {
    this.dialog.closeAll();
  }
}
