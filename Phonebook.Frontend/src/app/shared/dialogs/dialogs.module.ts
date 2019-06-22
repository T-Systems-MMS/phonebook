import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BugReportConsentComponent } from 'src/app/shared/dialogs/bug-report-consent/bug-report-consent.component';
import { DisplayNotificationDialog } from 'src/app/shared/dialogs/display-notification-dialog/display-notification.dialog';
import { ReleaseNotificationDialog } from 'src/app/shared/dialogs/release-notification-dialog/release-notification.dialog';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [ReleaseNotificationDialog, DisplayNotificationDialog, BugReportConsentComponent],
  imports: [RouterModule, MaterialModule],
  exports: [ReleaseNotificationDialog, DisplayNotificationDialog, BugReportConsentComponent],
  entryComponents: [ReleaseNotificationDialog, DisplayNotificationDialog, BugReportConsentComponent]
})
export class DialogsModule {}
