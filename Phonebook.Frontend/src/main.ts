import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Environment } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { migrate } from 'src/migration/Migration';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

environment.migrationLevel = migrate();

if (runtimeEnvironment.environment !== Environment.development) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
