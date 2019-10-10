import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/shared/components/user/user-detail/user-detail.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class UserInformationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData | any) {}
}
