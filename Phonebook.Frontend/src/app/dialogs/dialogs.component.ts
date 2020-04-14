import { Component, OnInit, Inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HtmlParser } from '@angular/compiler';
import { DialogItem } from 'src/app/dialogs/dialog-item';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
  title: string;
  content: DialogItem;
  data: any;
  @ViewChild('appdialogview', { read: ViewContainerRef }) container;
  constructor(public dialogRef: MatDialogRef<DialogsComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.content = data.content;
    this.title = data.title;
    this.data = data.inputData;
  }

  close() {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
