import { Component, OnInit } from '@angular/core';
import { Environment, RuntimeEnvironmentInterface } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-page-information',
  templateUrl: './page-information.component.html',
  styleUrls: ['./page-information.component.scss']
})
export class PageInformationComponent implements OnInit {
  public isPreview: boolean = true;
  public runtimeEnvironment: RuntimeEnvironmentInterface = runtimeEnvironment;
  constructor(public dialogService: DialogService) {}

  public ngOnInit() {
    this.isPreview = runtimeEnvironment.environment === Environment.production ? false : true;
  }
}
