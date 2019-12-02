import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';
import { NotImplementedService } from 'src/app/modules/not-implemented/not-implemented.service';
import { LanguageService } from 'src/app/services/language.service';
import { Language } from 'src/app/shared/models/enumerables/Language';
import { AppState, SetTheme } from 'src/app/shared/states';
import { Theme } from 'src/app/shared/models/enumerables/Theme';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public languageValue: Language = Language.en;
  @Select(AppState.activeTheme)
  public themeValue$: Observable<Theme>;
  public themes: string[] = Object.values(Theme);
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
    this.languageValue = this.languageService.getLanguage();
  }

  public changeTheme(themeClass: Theme) {
    this.store.dispatch(new SetTheme(themeClass));
  }

  public changeLanguage(lang: Language) {
    this.languageService.setLanguage(lang);
  }

  public changeLayout(layout: Layout) {
    this.notImplementedService.notImplemented();
    this.layoutValue = layout;
  }

  public getThemeName(theme: Theme) {
    switch (theme) {
      case Theme.blue_light_theme: {
        return this.i18n({
          value: 'Blue Light Theme',
          description: 'Color Theme Option: Blue Light',
          id: 'SettingsComponentColorThemeBlueLight',
          meaning: 'SettingsComponent'
        });
      }
      case Theme.blue_dark_theme: {
        return this.i18n({
          value: 'Blue Dark Theme',
          description: 'Color Theme Option: Blue Dark',
          id: 'SettingsComponentColorThemeBlueDark',
          meaning: 'SettingsComponent'
        });
      }
      case Theme.magenta_light_theme: {
        return this.i18n({
          value: 'Magenta Light Theme',
          description: 'Color Theme Option: Magenta Light',
          id: 'SettingsComponentColorThemeMagentaLight',
          meaning: 'SettingsComponent'
        });
      }
      case Theme.magenta_dark_theme: {
        return this.i18n({
          value: 'Magenta Dark Theme',
          description: 'Color Theme Option: Magenta Dark',
          id: 'SettingsComponentColorThemeMagentaDark',
          meaning: 'SettingsComponent'
        });
      }
      default:
        throw Error(`Translation for theme ${theme} does not exists.`);
    }
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
