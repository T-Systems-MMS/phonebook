import { Component, OnInit } from '@angular/core';
import { Environment, EnvironmentService } from 'src/app/services/environment.service';
import { RuntimeEnvironmentInterface } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';

@Component({
  selector: 'app-page-information',
  templateUrl: './page-information.component.html',
  styleUrls: ['./page-information.component.scss']
})
export class PageInformationComponent implements OnInit {
  public isPreview: boolean = true;
  public runtimeEnvironment: RuntimeEnvironmentInterface = runtimeEnvironment;
  constructor(private environmentService: EnvironmentService) {}

  public ngOnInit() {
    this.isPreview = this.environmentService.getEnvironment() === Environment.production ? false : true;
  }
}
