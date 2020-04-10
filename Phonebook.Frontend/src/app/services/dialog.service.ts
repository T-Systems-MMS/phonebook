import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogsComponent } from 'src/app/dialogs/dialogs.component';
import { DialogItem } from 'src/app/dialogs/dialog-item';
import { ReleaseNotificationDialog } from 'src/app/shared/dialogs/release-notification-dialog/release-notification.dialog';
import { BugReportConsentComponent } from 'src/app/shared/dialogs/bug-report-consent/bug-report-consent.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private httpClient: HttpClient) {}
  public displayDialog(item: string) {
    switch (item) {
      case 'release-notes':
        this.dialog.open(DialogsComponent, {
          data: {
            title: "We've updated to a newer Version!",
            content: new DialogItem(ReleaseNotificationDialog),
          },
          maxHeight: '90vh',
          maxWidth: '90vh',
        });
        break;
    }
  }
}
