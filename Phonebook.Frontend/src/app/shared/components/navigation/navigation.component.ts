import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Person } from 'src/app/shared/models';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { VERSION, HASH_SHORT, HASH_LONG } from 'src/environments/version';
import { EnvironmentInterface } from 'src/environments/EnvironmentInterfaces';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { EnvironmentService, Environment } from 'src/app/services/environment.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TableSettingsDialog } from 'src/app/modules/table/dialogs/table-settings-dialog/table-settings.dialog';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { TableState } from 'src/app/shared/states';
import { filter } from 'rxjs/operators';

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

  public currentUser: Person | null = null;
  constructor(
    private currentUserService: CurrentUserService,
    public environmentService: EnvironmentService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  public ngOnInit() {
    this.currentUserService
      .getCurrentUser()
      .pipe(untilComponentDestroyed(this))
      .subscribe(user => {
        if (user != null) {
          this.currentUser = user;
        }
      }, error => {
        this.currentUser = null;
      });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(route => {
      this.displayTableSettings = this.router.url.includes('search');
    });
  }

  public openSettings() {
    this.dialog.open(TableSettingsDialog, {
      height: '90vh',
      width: '90vw'
    });
  }

  public ngOnDestroy() { }

  public navigateToOwnProfile() {
    if (this.currentUser != null) {
      this.router.navigateByUrl(`/user/${ this.currentUser.Id }`);
    }
  }
}
