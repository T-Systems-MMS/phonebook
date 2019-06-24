import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';
import { NotImplementedService } from 'src/app/modules/not-implemented/not-implemented.service';
import { LanguageService } from 'src/app/services/language.service';
import { Language } from 'src/app/shared/models/enumerables/Language';
import { AppState, SetTheme } from 'src/app/shared/states';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public languageValue: Language = Language.en;
  public themeValue: string = '';
  public languages: string[] = Object.keys(Language);
  public layoutValue: Layout = Layout.view_module;
  public layout: string[] = Object.values(Layout);
  public featureFlags: Observable<{ name: string; value: boolean }[]> = this.featureFlagService.getAllDefaultDisabled();

  constructor(
    private store: Store,
    public languageService: LanguageService,
    private notImplementedService: NotImplementedService,
    public featureFlagService: FeatureFlagService,
    private i18n: I18n
  ) {}

  public ngOnInit() {
    this.themeValue = this.store.selectSnapshot(AppState.theme);
    this.languageValue = this.languageService.getLanguage();
  }

  public changeTheme(themeClass: string) {
    this.store.dispatch(new SetTheme(themeClass));
  }

  public changeLanguage(lang: Language) {
    this.languageService.setLanguage(lang);
  }

  public changeLayout(layout: Layout) {
    this.notImplementedService.notImplemented();
    this.layoutValue = layout;
  }

  public getLayoutName(layout: Layout): string {
    switch (layout) {
      case Layout.view_list: {
        return this.i18n({
          value: 'List View',
          description: 'View Mode: List',
          id: 'NavigationComponentViewModeList',
          meaning: 'NavigationComponent'
        });
      }
      case Layout.view_module: {
        return this.i18n({
          value: 'Module View',
          description: 'View Mode: Module',
          id: 'NavigationComponentViewModeModule',
          meaning: 'NavigationComponent'
        });
      }
      case Layout.view_stream: {
        return this.i18n({
          value: 'Stream View',
          description: 'View Mode: Stream',
          id: 'NavigationComponentViewModeStream',
          meaning: 'NavigationComponent'
        });
      }
    }
  }

  public changeFeatureFlag(event: MatSlideToggleChange, flag: string) {
    this.featureFlagService.set(flag, event.checked);
  }

  public ngOnDestroy() {}
}

enum Layout {
  view_list = 'view_list',
  view_module = 'view_module',
  view_stream = 'view_stream'
}
