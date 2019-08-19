import { Component, OnInit } from '@angular/core';
import { Environment, RuntimeEnvironmentInterface } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-information',
  templateUrl: './page-information.component.html',
  styleUrls: ['./page-information.component.scss']
})
export class PageInformationComponent implements OnInit {
  public isPreview: boolean = true;
  public runtimeEnvironment: RuntimeEnvironmentInterface = runtimeEnvironment;
  public contributorsHTML: string = '';
  constructor(private httpClient: HttpClient) {}

  public ngOnInit() {
    this.isPreview = runtimeEnvironment.environment === Environment.production ? false : true;
    this.loadContributors();
  }

  public loadContributors(): void {
    const text = 'Contributors could not be loaded.';
    this.httpClient
      .get('https://raw.githubusercontent.com/mschwrdtnr/phonebook/master/docs/CONTRIBUTORS.md', {
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
