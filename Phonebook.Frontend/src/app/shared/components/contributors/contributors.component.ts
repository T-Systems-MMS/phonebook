import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss'],
})
export class ContributorsComponent implements OnInit {
  public contributorsLoaded: boolean = false;
  public contributorsHTML: string = '';
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  public ngOnInit() {
    this.loadContributors();
  }

  public loadContributors(): void {
    this.httpClient
      .get('assets/CONTRIBUTORS.md', {
        responseType: 'text',
      })
      .subscribe(
        (success) => {
          this.contributorsLoaded = true;
          this.contributorsHTML = success;
        },
        (error) => {
          this.snackBar.open(
            $localize`:ContributorsErrorMessage|Contributors error Message@@ContributorsErrorMessage:Contributors could not be loaded.`,
            '',
            {
              duration: 5000,
            }
          );
        }
      );
  }
}
