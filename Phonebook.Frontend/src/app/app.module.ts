//Angular Imports
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlatformModule } from '@angular/cdk/platform';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
// NGXS States
import { NgxsModule } from '@ngxs/store';
//Custom Imports
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { FeatureFlagModule } from 'src/app/modules/feature-flag/feature-flag.module';
import { NotImplementedModule } from 'src/app/modules/not-implemented/not-implemented.module';
import { ProfilePictureModule } from 'src/app/modules/profile-picture/profile-picture.module';
import { TableModule } from 'src/app/modules/table/table.module';
import { DashboardComponent } from 'src/app/pages/dashboard/components/overview/dashboard.component';
import { SettingsModule } from 'src/app/pages/settings/settings.module';
import { UserPagesModule } from 'src/app/pages/users/user-pages.module';
import { ApiModule } from 'src/app/services/api/api.module';
import { MailService } from 'src/app/services/mail.service';
import { ReleaseInfoService } from 'src/app/services/release-info.service';
import { ServiceWorkerService } from 'src/app/services/service-worker.service';
import { ThemeService } from 'src/app/services/theme.service';
import { WindowRef } from 'src/app/services/windowRef.service';
import { AddFilterModule } from 'src/app/shared/components/add-filter/add-filter.module';
import { NavigationComponent } from 'src/app/shared/components/navigation/navigation.component';
import { OnlineBarComponent } from 'src/app/shared/components/online-bar/online-bar.component';
import { UserModule } from 'src/app/shared/components/user/user.module';
import { ColumnTranslate } from 'src/app/shared/config/columnTranslate';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';
import { IeWarningModule } from 'src/app/shared/dialogs/ie-warning/ie-warning.module';
import { FeedbackDrawerModule } from 'src/app/shared/directives/feedback-drawer/feedback-drawer.module';
import { ErrorHandlerModule } from 'src/app/shared/error/error.module';
// Modules
import { MaterialModule } from 'src/app/shared/material.module';
import { WINDOW_PROVIDER } from 'src/app/shared/providers/window.provider';
import {
  AppState,
  BookmarksState,
  CommonPersonsState,
  LastPersonsState,
  SearchState,
  TableState
} from 'src/app/shared/states';
import { environment } from 'src/environments/environment';
// Services
import { FloorplanService } from './services/floorplan.service';
import { SearchComponent } from './shared/components/search/search.component';

declare const require;

@NgModule({
  declarations: [AppComponent, SearchComponent, DashboardComponent, NavigationComponent, OnlineBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ErrorHandlerModule.forRoot(),
    MaterialModule,
    DialogsModule,
    ProfilePictureModule,
    SettingsModule,
    UserModule,
    FeatureFlagModule.forRoot(),
    NotImplementedModule,
    FeedbackDrawerModule,
    MatBadgeModule,
    NgxsModule.forRoot([AppState, BookmarksState, LastPersonsState, CommonPersonsState, SearchState, TableState], {
      // TODO: Fix https://github.com/T-Systems-MMS/phonebook/issues/95 first.
      // developmentMode: !environment.production
    }),
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
    UserPagesModule
  ],
  providers: [
    // {
    //   provide: TRANSLATIONS,
    //   useFactory: (locale: string) => {
    //     locale = locale || 'en';
    //     // if we are already on our default locale, we do not need to set any translations
    //     return require(`raw-loader!../i18n/messages.${locale}.xlf`).default;
    //   },
    //   deps: [LOCALE_ID]
    // },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { panelClass: ['mat-dialog-override', 'mat-typography'] } },
    WINDOW_PROVIDER,
    ServiceWorkerService,
    WindowRef,
    MailService,
    FloorplanService,
    ReleaseInfoService,
    ThemeService,
    ColumnTranslate
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
