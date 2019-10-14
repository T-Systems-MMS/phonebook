import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/shared/components/user/user-detail/user-detail.component';
import { CurrentUserService } from 'src/app/services/api/current-user.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class UserInformationDialogComponent implements OnInit {
  public currentUserId: string = '';
  constructor(
    public currentUserService: CurrentUserService,
    public dialogRef: MatDialogRef<UserInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData | any
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
    console.log(this.currentUserId);
  }
  public get onMyProfile(): boolean {
    return this.currentUserId.toLowerCase() === this.data.Id.toLowerCase();
  }
}
