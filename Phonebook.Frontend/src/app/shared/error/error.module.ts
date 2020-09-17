import { ErrorHandler, ModuleWithProviders, NgModule, Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { Environment } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { VERSION } from 'src/environments/version';

if (runtimeEnvironment.ravenURL) {
  try {
    Raven.config(runtimeEnvironment.ravenURL, {
      autoBreadcrumbs: true,
      environment: runtimeEnvironment.environment.toString(),
      release: VERSION,
      sanitizeKeys: ['currentUserName', 'userName'],
      shouldSendCallback: function (data) {
        return JSON.parse(localStorage.getItem('appstate') || '').sendFeedback || false;
      },
      ignoreUrls: ['localhost:4200'],
    }).install();
  } catch (err) {
    console.error(err);
  }
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  public handleError(error: any): void {
    if (error.name === 'HttpErrorResponse') {
      return;
    }

    if (runtimeEnvironment.environment !== Environment.development) {
      // App is in Production
      if (runtimeEnvironment.ravenURL) {
        // Raven enabled
        console.error(error);
        Raven.captureException(error);
        if (JSON.parse(localStorage.getItem('appstate') || '').sendFeedback || false) {
          Raven.showReportDialog();
        }
      } else {
        // Nothing, maybe later an error Dialog
        console.error(error);
      }
    } else {
      // App is in Development
      throw error;
    }
  }
}

@NgModule({
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
})
export class ErrorHandlerModule {
  public static forRoot(): ModuleWithProviders<ErrorHandlerModule> {
    return {
      ngModule: ErrorHandlerModule,
      providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
    };
  }
}
