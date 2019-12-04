import { Component, OnInit, Inject } from '@angular/core';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IncorrectUserInformationDialogData } from 'src/app/shared/components/user/user-detail/user-detail.component';
import { WindowRef } from 'src/app/services/windowRef.service';
import { MailService } from 'src/app/services/mail.service';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-user-information',
  templateUrl: './incorrect-user-information.component.html',
  styleUrls: ['./incorrect-user-information.component.scss']
})
export class IncorrectUserInformationComponent implements OnInit {
  public currentUserId: string = '';
  public mailBody : string = '';
  constructor(
    private i18n: I18n,
    private mailService: MailService,
    public windowRef: WindowRef,
    public currentUserService: CurrentUserService,
    public dialogRef: MatDialogRef<IncorrectUserInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IncorrectUserInformationDialogData | any

  ) {}

  public ngOnInit() {
    this.currentUserService.getCurrentUserId().subscribe(
      id => {
        this.currentUserId = id;
      },
      error => {
        // do nothing, as the id will never be ''
      }
    );
  }
  public get onMyProfile(): boolean {
    return this.currentUserId.toLowerCase() === this.data.person.Id.toLowerCase();
  }
  public sendMail() {
    this.mailService.openMail(
      this.i18n({
        meaning: 'MailToMateSubject',
        description: 'Send a mail to your mate if there is something wrong on the profile ',
        id: 'User-InformationDialogSubject',
        value: 'There is an Issue with your Phonebook Profil'
      }),
      this.i18n({
        meaning: 'MailToMateGreeting',
        description: 'Send a mail to your mate if there is something wrong on the profile ',
        id: 'User-InformationDialogGreeting',
        value: 'Hi '
      })
      + this.data.person.Firstname +
      this.i18n({
        meaning: 'MailToMateBody',
        description: 'Send a mail to your mate if there is something wrong on the profile ',
        id: 'User-InformationDialogBody',
        value: ', \n while browsing your profile I noticed that something is not right: \n\n\n Please contact the HR Department to fix it. This is the Phonebook Link: '
      })
      + this.windowRef.getCurrentUrl(),
      this.data.person.Contacts.Email
    );
  }
}
