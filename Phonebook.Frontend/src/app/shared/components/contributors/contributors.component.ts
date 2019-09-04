import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss']
})
export class ContributorsComponent implements OnInit {
  public contributorsHTML: string = '';
  constructor(private httpClient: HttpClient) {}

  public ngOnInit() {
    this.loadContributors();
  }

  public loadContributors(): void {
    const text = 'Contributors could not be loaded.';
    this.httpClient
      .get('assets/CONTRIBUTORS.md', {
        responseType: 'text'
      })
      .subscribe(
        success => {
          this.contributorsHTML = success;
        },
        error => {
          this.contributorsHTML = 'Contributors could not be loaded.';
        }
      );
  }
}
