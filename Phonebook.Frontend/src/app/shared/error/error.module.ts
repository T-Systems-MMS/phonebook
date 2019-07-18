import { ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import * as Raven from 'raven-js';
import { environment } from 'src/environments/environment.debug';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { VERSION } from 'src/environments/version';

if (runtimeEnvironment.ravenURL) {
  try {
    Raven.config(runtimeEnvironment.ravenURL, {
      autoBreadcrumbs: true,
      environment: environment.production ? 'production' : 'preview',
      release: VERSION,
      sanitizeKeys: ['currentUserName', 'userName'],
      shouldSendCallback: function(data) {
        return JSON.parse(localStorage.getItem('appstate') || '').sendFeedback || false;
      },
      ignoreUrls: ['localhost:4200']
    }).install();
  } catch (err) {
    console.error(err);
  }
}

export class GlobalErrorHandler implements ErrorHandler {
  public handleError(error: any): void {
    if (error.name === 'HttpErrorResponse') {
      return;
    }

    if (environment.production) {
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
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }]
})
export class ErrorHandlerModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ErrorHandlerModule,
      providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }]
    };
  }
}
