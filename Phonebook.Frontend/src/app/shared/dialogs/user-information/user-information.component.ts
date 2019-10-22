import { Component, OnInit, Inject } from '@angular/core';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { dialogData } from 'src/app/shared/components/user/user-detail/user-detail.component';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class IncorrectUserInformationComponent implements OnInit {

  public currentUserId: string = '';
  constructor(
    public currentUserService: CurrentUserService,
    public dialogRef: MatDialogRef<IncorrectUserInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData | any
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
    return this.currentUserId.toLowerCase() === this.data.Id.toLowerCase();
  }
}
