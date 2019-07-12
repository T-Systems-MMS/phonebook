//Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, TRANSLATIONS, LOCALE_ID } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//Custom Imports
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { SearchComponent } from './shared/components/search/search.component';
import { WindowRef } from 'src/app/services/windowRef.service';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { NavigationComponent } from 'src/app/shared/components/navigation/navigation.component';
import { OnlineBarComponent } from 'src/app/shared/components/online-bar/online-bar.component';
import { ProfilePictureModule } from 'src/app/modules/profile-picture/profile-picture.module';
import { ColumnTranslate } from 'src/app/shared/config/columnTranslate';

// Services
import { FloorplanService } from './services/floorplan.service';
import { ServiceWorkerService } from 'src/app/services/service-worker.service';
import { MailService } from 'src/app/services/mail.service';
import { ReleaseInfoService } from 'src/app/services/release-info.service';
import { ThemeService } from 'src/app/services/theme.service';
import { EnvironmentService } from 'src/app/services/environment.service';

// NGXS States
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import {
  BookmarksState,
  CommonPersonsState,
  AppState,
  LastPersonsState,
  TableState,
  SearchState
} from 'src/app/shared/states';

// Modules
import { MaterialModule } from 'src/app/shared/material.module';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';
import { SettingsModule } from 'src/app/pages/settings/settings.module';
import { UserModule } from 'src/app/shared/components/user/user.module';
import { FeatureFlagModule } from 'src/app/modules/feature-flag/feature-flag.module';
import { NotImplementedModule } from 'src/app/modules/not-implemented/not-implemented.module';

// Sentry Configuration
import * as Raven from 'raven-js';
import { VERSION } from 'src/environments/version';
try {
  Raven.config(runtimeEnvironment.ravenURL, {
    autoBreadcrumbs: true,
    environment: environment.production ? 'production' : 'preview',
    release: VERSION,
    sanitizeKeys: ['currentUserName', 'userName', 'someHidiousKey'],
    shouldSendCallback: function(data) {
      return JSON.parse(localStorage.getItem('appstate') || '').sendFeedback || false;
    },
    ignoreUrls: ['localhost:4200']
  }).install();
} catch (err) {
  console.error(err);
}

export class RavenErrorHandler implements ErrorHandler {
  public handleError(err: any): void {
    if (environment.production) {
      Raven.captureException(err);
      if (JSON.parse(localStorage.getItem('appstate') || '').sendFeedback || false) {
        Raven.showReportDialog();
      }
    } else {
      console.error(err);
    }
  }
}

import { I18n } from '@ngx-translate/i18n-polyfill';
import { AddFilterModule } from 'src/app/shared/components/add-filter/add-filter.module';
import { WINDOW_PROVIDER } from 'src/app/shared/providers/window.provider';
import { TableModule } from 'src/app/modules/table/table.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { ApiModule } from 'src/app/services/api/api.module';
import { FeedbackDrawerModule } from 'src/app/shared/directives/feedback-drawer/feedback-drawer.module';
import { IeWarningModule } from 'src/app/shared/dialogs/ie-warning/ie-warning.module';
import { PlatformModule } from '@angular/cdk/platform';
import { UserDetailPageModule } from 'src/app/pages/user-detail-page/user-detail-page.module';
declare const require;

@NgModule({
  declarations: [AppComponent, SearchComponent, DashboardComponent, NavigationComponent, OnlineBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    DialogsModule,
    ProfilePictureModule,
    SettingsModule,
    UserModule,
    FeatureFlagModule,
    NotImplementedModule,
    FeedbackDrawerModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    NgxsModule.forRoot([AppState, BookmarksState, LastPersonsState, CommonPersonsState, SearchState, TableState]),
    NgxsStoragePluginModule.forRoot({
      key: ['appstate', 'bookmarks', 'commonpersons', 'lastpersons', 'tablestate']
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    AddFilterModule,
    TableModule,
    ApiModule,
    // Has to be included here because of https://stackoverflow.com/a/41519512/9277073
    FeedbackDrawerModule,
    DragDropModule,
    ApiModule,
    IeWarningModule,
    PlatformModule,
    // Pages
    UserDetailPageModule
  ],
  providers: [
    {
      provide: TRANSLATIONS,
      useFactory: (locale: string) => {
        locale = locale || 'en';
        // if we are already on our default locale, we do not need to set any translations
        return require(`raw-loader!../i18n/messages.${locale}.xlf`);
      },
      deps: [LOCALE_ID]
    },
    WINDOW_PROVIDER,
    ServiceWorkerService,
    WindowRef,
    MailService,
    FloorplanService,
    ReleaseInfoService,
    ThemeService,
    I18n,
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    ColumnTranslate,
    EnvironmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
