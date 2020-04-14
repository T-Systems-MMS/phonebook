import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
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
    switch (item) {
      case 'release-notes':
        this.dialog.open(DialogsComponent, {
          data: {
            title: "We've updated to a newer Version!",
            content: new DialogItem(ReleaseNotificationDialog)
          },
          maxHeight: '90vh',
          maxWidth: '120vh',
          hasBackdrop: true
        });
        break;
      case 'feedback':
        this.dialog.open(DialogsComponent, {
          data: {
            title: 'Leave Feedback, report a Bug or suggest a new Idea',
            content: new DialogItem(FeedbackDrawerSheetComponent)
          },
          maxHeight: '90vh',
          maxWidth: '120vh',
          hasBackdrop: true
        });
        break;
      case 'notification':
        this.dialog.open(DialogsComponent, {
          data: {
            title: 'Welcome to the new Phonebook!',
            content: new DialogItem(DisplayNotificationDialog)
          },
          maxHeight: '90vh',
          maxWidth: '120vh',
          hasBackdrop: true
        });
        break;
      case 'bug-report-consent':
        const matDialogRef = this.dialog.open(DialogsComponent, {
          data: {
            title: 'Leave Feedback, report a Bug or suggest a new Idea',
            content: new DialogItem(BugReportConsentComponent)
          },
          maxHeight: '90vh',
          maxWidth: '120vh',
          hasBackdrop: true
        });
        matDialogRef.afterClosed().subscribe((consent) => {
          this.store.dispatch(new SetSendFeedback(consent));
        });
        break;
      case 'profile-picture':
        this.dialog.open(DialogsComponent, {
          data: {
            title: inputData[1],
            content: new DialogItem(ProfilePictureEnlargeDialog),
            inputData: {
              imageUrl: inputData[0],
              text: inputData[1]
            }
          }
        });
        break;
      case 'ie-warning':
        this.dialog.open(DialogsComponent, {
          data: {
            title: 'This Website may not function properly in Internet Explorer',
            content: new DialogItem(IeWarningComponent)
          },
          panelClass: 'color-warn'
        });
        break;
      case 'incorrect-user-information':
        this.dialog.open(DialogsComponent, {
          data: {
            title: 'Incorrect User Information',
            content: new DialogItem(IncorrectUserInformationComponent),
            inputData: inputData
          },
          maxHeight: '90vh',
          maxWidth: '120vh',
          hasBackdrop: true
        });
        break;
    }
  }
  public closeDialog() {
    this.dialog.closeAll();
  }
}
