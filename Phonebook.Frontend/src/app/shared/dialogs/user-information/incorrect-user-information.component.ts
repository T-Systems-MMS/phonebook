import { Component, OnInit, Inject } from '@angular/core';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IncorrectUserInformationDialogData } from 'src/app/shared/components/user/user-detail/user-detail.component';
import { WindowRef } from 'src/app/services/windowRef.service';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './incorrect-user-information.component.html',
  styleUrls: ['./incorrect-user-information.component.scss']
})
export class IncorrectUserInformationComponent implements OnInit {
  public currentUserId: string = '';
  public mailBody : string = '';
  constructor(
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
}
