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
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private store: Store
  ) {}
  public displayDialog(item: string) {
    switch (item) {
      case 'release-notes':
        this.dialog.open(DialogsComponent, {
          data: {
            title: "We've updated to a newer Version!",
            content: new DialogItem(ReleaseNotificationDialog),
          },
          maxHeight: '90vh',
          maxWidth: '120vh',
          hasBackdrop: true,
        });
        break;
      case 'feedback':
        this.dialog.open(DialogsComponent, {
          data: {
            title: 'Leave Feedback, report a Bug or suggest a new Idea',
            content: new DialogItem(FeedbackDrawerSheetComponent),
          },
          maxHeight: '90vh',
          maxWidth: '120vh',
          hasBackdrop: true,
        });
        break;
      case 'notification':
        this.dialog.open(DialogsComponent, {
          data: {
            title: 'Welcome to the new Phonebook!',
            content: new DialogItem(DisplayNotificationDialog),
          },
          maxHeight: '90vh',
          maxWidth: '120vh',
          hasBackdrop: true,
        });
        break;
      case 'bug-report-consent':
        const matDialogRef = this.dialog.open(DialogsComponent, {
          data: {
            title: 'Leave Feedback, report a Bug or suggest a new Idea',
            content: new DialogItem(BugReportConsentComponent),
          },
          maxHeight: '90vh',
          maxWidth: '120vh',
          hasBackdrop: true,
        });
        matDialogRef.afterClosed().subscribe((consent) => {
          this.store.dispatch(new SetSendFeedback(consent));
        });

        break;
    }
  }
}
