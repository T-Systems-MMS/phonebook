import { Component, OnInit, Inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HtmlParser } from '@angular/compiler';
import { DialogItem } from 'src/app/dialogs/dialog-item';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss'],
})
export class DialogsComponent implements OnInit {
  public title: string;
  public content: DialogItem;
  public componentData: any;
  public footer: HtmlParser;
  @ViewChild('appdialogview', { read: ViewContainerRef }) container;
  constructor(public dialogRef: MatDialogRef<DialogsComponent>, @Inject(MAT_DIALOG_DATA) matData) {
    this.content = matData.content;
    this.title = matData.title;
    this.componentData = matData.inputData;
    this.footer = matData.footer;
  }

  public close() {
    this.dialogRef.close();
  }
  public ngOnInit() {}
}
