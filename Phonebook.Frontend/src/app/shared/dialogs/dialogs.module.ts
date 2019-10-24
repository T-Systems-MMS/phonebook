import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BugReportConsentComponent } from 'src/app/shared/dialogs/bug-report-consent/bug-report-consent.component';
import { DisplayNotificationDialog } from 'src/app/shared/dialogs/display-notification-dialog/display-notification.dialog';
import { ReleaseNotificationDialog } from 'src/app/shared/dialogs/release-notification-dialog/release-notification.dialog';
import { MaterialModule } from 'src/app/shared/material.module';
import { ContributorsModule } from 'src/app/shared/components/contributors/contributors.module';
import { CommonModule } from '@angular/common';
import { IncorrectUserInformationComponent } from 'src/app/shared/dialogs/user-information/incorrect-user-information.component';

@NgModule({
  declarations: [ReleaseNotificationDialog, DisplayNotificationDialog, BugReportConsentComponent, IncorrectUserInformationComponent],
  imports: [CommonModule, RouterModule, MaterialModule, ContributorsModule],
  exports: [ReleaseNotificationDialog, DisplayNotificationDialog, BugReportConsentComponent, IncorrectUserInformationComponent],
  entryComponents: [ReleaseNotificationDialog, DisplayNotificationDialog, BugReportConsentComponent, IncorrectUserInformationComponent]
})
export class DialogsModule {}
