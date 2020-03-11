import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';

import { AppState, SetTheme } from 'src/app/shared/states';
import { Select } from '@ngxs/store';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';
import { MatBadgeModule } from '@angular/material/badge';
import { ReleaseInfoService } from 'src/app/services/release-info.service';
import { TableSettingsDialog } from 'src/app/modules/table/dialogs/table-settings-dialog/table-settings.dialog';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { Person } from 'src/app/shared/models';
import { TableState } from 'src/app/shared/states';
import { environment } from 'src/environments/environment';
import { Environment, EnvironmentInterface } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { HASH_LONG, HASH_SHORT, VERSION } from 'src/environments/version';
import { Theme } from '../../models/enumerables/Theme';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  host: { class: 'pb-expand' }
})

export class NavigationComponent implements OnInit, OnDestroy {
  public version: typeof VERSION = VERSION;
  public versionHashShort: typeof HASH_SHORT = HASH_SHORT;
  public versionHashLong: typeof HASH_LONG = HASH_LONG;
  public environment: EnvironmentInterface = environment;
  public Environment: typeof Environment = Environment;
  public currentEnvironment: Environment = runtimeEnvironment.environment;

  @Select(TableState.resultCount)
  public tableResultCount$: Observable<number>;
  public displayTableSettings: boolean = false;
  public hasImage: boolean = false;
  public currentUser: Person | null = null;
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
    public dialog: MatDialog,
    public featureFlagService: FeatureFlagService,
    public badge: MatBadgeModule,
    public releaseInfoService: ReleaseInfoService
  ) { }

  public ngOnInit() {
    this.currentUserService
      .getCurrentUser()
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        user => {
          if (user != null) {
            this.currentUser = user;
          }
        },
        error => {
          this.currentUser = null;
        }
      );
    this.currentUserService
      .doesUserHasImage()
      .pipe(untilComponentDestroyed(this))
      .subscribe(hasImage => {
        this.hasImage = hasImage;
      });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(route => {
      this.displayTableSettings = this.router.url.includes('search');
    });
  }

  public openSettings() {
    //prevent opening multiple dialogs
    if (this.dialog.openDialogs.length === 0) {
      this.dialog.open(TableSettingsDialog, {
        height: '90vh',
        width: '90vw'
      });
    }
  }

  public ngOnDestroy() {}

  public getGreetingMessage(): Observable<string> {
    return this.featureFlagService.get('firstApril').pipe(
      untilComponentDestroyed(this),
      map(enabled => {
        if (enabled) {
          return $localize`:NavigationBar|Greetings Message on first April@@navigationBarGreetingsMessageFirstApril:Happy April Fools' Day`;
        }
        return $localize`:NavigationBar|Greetings Message@@navigationBarGreetingsMessage:Have a nice day`;
      })
    );
  }

  public getEnvironmentTag(): string {
    if (runtimeEnvironment.environmentTag === '') {
      switch (this.currentEnvironment) {
        case Environment.development:
          return 'dev';
        case Environment.preview:
          return 'preview';
        case Environment.production:
          return 'prod';
        default:
          return 'not set';
      }
    } else {
      return runtimeEnvironment.environmentTag;
    }
  }
  public navigateToSettings() {
      this.router.navigateByUrl(`/settings`);
  }

  public navigateToOwnProfile() {
    if (this.currentUser != null) {
      this.router.navigateByUrl(`/user/${this.currentUser.Id}`);
    }
  }
}
