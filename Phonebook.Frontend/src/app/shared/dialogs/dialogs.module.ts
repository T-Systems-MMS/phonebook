import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BugReportConsentComponent } from 'src/app/shared/dialogs/bug-report-consent/bug-report-consent.component';
import { DisplayNotificationDialog } from 'src/app/shared/dialogs/display-notification-dialog/display-notification.dialog';
import { ReleaseNotificationDialog } from 'src/app/shared/dialogs/release-notification-dialog/release-notification.dialog';
import { MaterialModule } from 'src/app/shared/material.module';
import { ContributorsModule } from 'src/app/shared/components/contributors/contributors.module';
import { DialogComponent } from './userinformation/dialog.component';
import { MatDialogRef } from '@angular/material';

@NgModule({
  declarations: [ReleaseNotificationDialog, DisplayNotificationDialog, BugReportConsentComponent],
  imports: [RouterModule, MaterialModule, ContributorsModule],
  exports: [ReleaseNotificationDialog, DisplayNotificationDialog, BugReportConsentComponent],
  entryComponents: [ReleaseNotificationDialog, DisplayNotificationDialog, BugReportConsentComponent, DialogComponent],
  providers: [MatDialogRef]
})
export class DialogsModule {}
