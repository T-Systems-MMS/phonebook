import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-change-profile-picture-dialog',
  templateUrl: './change-profile-picture-dialog.component.html',
  styleUrls: ['./change-profile-picture-dialog.component.scss']
})
export class ChangeProfilePictureDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ChangeProfilePictureDialogComponent>) {}

  public ngOnInit() {}
}
