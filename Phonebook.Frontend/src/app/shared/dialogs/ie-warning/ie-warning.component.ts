import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ie-warning',
  templateUrl: './ie-warning.component.html',
  styleUrls: ['./ie-warning.component.scss']
})
export class IeWarningComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<IeWarningComponent>) {}

  public ngOnInit() {}
}
