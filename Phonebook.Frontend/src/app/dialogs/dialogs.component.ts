import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss'],
})
export class DialogsComponent implements OnInit {
  title: string;
  content: string;

  constructor(public dialogRef: MatDialogRef<DialogsComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.content = data.content;
    this.title = data.title;
  }

  ngOnInit() {}
}
