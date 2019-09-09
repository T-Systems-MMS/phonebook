import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss']
})
export class ContributorsComponent implements OnInit {
  public contributorsLoaded: boolean = false;
  public contributorsHTML: string = '';
  constructor(private httpClient: HttpClient, private i18n: I18n, private snackBar: MatSnackBar) {}

  public ngOnInit() {
    this.loadContributors();
  }

  public loadContributors(): void {
    this.httpClient
      .get('assets/CONTRIBUTORS.md', {
        responseType: 'text'
      })
      .subscribe(
        success => {
          this.contributorsLoaded = true;
          this.contributorsHTML = success;
        },
        error => {
          this.snackBar.open(
            this.i18n({
              value: 'Contributors could not be loaded.',
              description: 'Contributors error Message',
              id: 'ContributorsErrorMessage',
              meaning: 'ContributorsErrorMessage'
            }),
            '',
            {
              duration: 5000
            }
          );
        }
      );
  }
}
