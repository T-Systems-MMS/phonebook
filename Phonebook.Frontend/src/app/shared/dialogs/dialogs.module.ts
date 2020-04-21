import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BugReportConsentComponent } from 'src/app/shared/dialogs/bug-report-consent/bug-report-consent.component';
import { DisplayNotificationDialog } from 'src/app/shared/dialogs/display-notification-dialog/display-notification.dialog';
import { ReleaseNotificationDialog } from 'src/app/shared/dialogs/release-notification-dialog/release-notification.dialog';
import { FeedbackDrawerSheetComponent } from 'src/app/shared/directives/feedback-drawer/feedback-drawer-sheet/feedback-drawer-sheet.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ContributorsModule } from 'src/app/shared/components/contributors/contributors.module';
import { CommonModule } from '@angular/common';
import { IncorrectUserInformationComponent } from 'src/app/shared/dialogs/user-information/incorrect-user-information.component';
import { UserModule } from 'src/app/shared/components/user/user.module';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    FeedbackDrawerSheetComponent,
    ReleaseNotificationDialog,
    DisplayNotificationDialog,
    BugReportConsentComponent,
    IncorrectUserInformationComponent
  ],
  imports: [CommonModule, RouterModule, MaterialModule, ContributorsModule, UserModule],
  exports: [
    FeedbackDrawerSheetComponent,
    ReleaseNotificationDialog,
    DisplayNotificationDialog,
    BugReportConsentComponent,
    IncorrectUserInformationComponent
  ],
  entryComponents: [
    FeedbackDrawerSheetComponent,
    ReleaseNotificationDialog,
    DisplayNotificationDialog,
    BugReportConsentComponent,
    IncorrectUserInformationComponent
  ]
})
export class DialogsModule {}
