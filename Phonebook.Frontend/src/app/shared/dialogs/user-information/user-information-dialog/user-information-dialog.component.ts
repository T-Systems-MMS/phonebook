import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { Person } from 'src/app/shared/models';

export interface DialogData {
  Firstname: string;
  Lastname: string;
  Titel: string;
}

@Component({
  selector: 'app-user-information-dialog',
  templateUrl: './user-information-dialog.component.html',
  styleUrls: ['./user-information-dialog.component.scss']
})
export class UserInformationDialogComponent {
  constructor(private matDialog: MatDialog) {}

 public openDialog(user: Person): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '22vh';
    dialogConfig.width = '30vw';
    const name = {
      firstNames: user.Firstname,
      lastNames: user.Surname,
      Titel: user.Title
    };
    dialogConfig.data = {
      Firstname: name.firstNames,
      Lastname: name.lastNames,
      Titel: name.Titel
    };
    this.matDialog.open(DialogComponent, dialogConfig);
  }
}
