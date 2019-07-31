import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Person } from 'src/app/shared/models';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { VERSION, HASH_SHORT, HASH_LONG } from 'src/environments/version';
import { EnvironmentInterface } from 'src/environments/EnvironmentInterfaces';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import {
  EnvironmentService,
  Environment
} from 'src/app/services/environment.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TableSettingsDialog } from 'src/app/modules/table/dialogs/table-settings-dialog/table-settings.dialog';
import { of, Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { TableState } from 'src/app/shared/states';
import { filter, map } from 'rxjs/operators';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';

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

  @Select(TableState.resultCount)
  public tableResultCount$: Observable<number>;
  public displayTableSettings: boolean = false;
  public hasImage: boolean = false;

  public currentUser: Person | null = null;
  constructor(
    private currentUserService: CurrentUserService,
    public environmentService: EnvironmentService,
    private router: Router,
    public dialog: MatDialog,
    public i18n: I18n,
    public featureFlagService: FeatureFlagService
  ) {}

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
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(route => {
        this.displayTableSettings = this.router.url.includes('search');
      });
  }

  public openSettings() {
    this.dialog.open(TableSettingsDialog, {
      height: '90vh',
      width: '90vw'
    });
  }

  public ngOnDestroy() {}

  public getGreetingMessage(): Observable<string> {
    return this.featureFlagService.get('firstApril').pipe(
      untilComponentDestroyed(this),
      map(enabled => {
        if (enabled) {
          return this.i18n({
            value: `Happy April Fools' Day`,
            description: 'Greetings Message on first April',
            id: 'navigationBarGreetingsMessageFirstApril',
            meaning: 'NavigationBar'
          });
        }
        return this.i18n({
          value: 'Have a nice day',
          description: 'Greetings Message',
          id: 'navigationBarGreetingsMessage',
          meaning: 'NavigationBar'
        });
      })
    );
  }

  public navigateToOwnProfile() {
    if (this.currentUser != null) {
      this.router.navigateByUrl(`/user/${this.currentUser.Id}`);
    }
  }
}
