import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bug-report-consent',
  templateUrl: './bug-report-consent.component.html',
  styleUrls: ['./bug-report-consent.component.scss'],
})
export class BugReportConsentComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<BugReportConsentComponent>) {}

  public ngOnInit() {}
}
