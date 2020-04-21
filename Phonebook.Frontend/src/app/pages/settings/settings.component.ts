import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';
import { LanguageService } from 'src/app/services/language.service';
import { Language } from 'src/app/shared/models/enumerables/Language';
import { Layout } from 'src/app/shared/models/enumerables/Layout';
import { Theme } from 'src/app/shared/models/enumerables/Theme';
import { AppState, SetLayout, SetTheme } from 'src/app/shared/states';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public languageValue: Language = Language.en;
  @Select(AppState.activeTheme)
  public themeValue$: Observable<Theme>;
  public themes: string[] = Object.values(Theme);
  public languages: string[] = Object.keys(Language);
  public featureFlags: Observable<
    { name: string; value: boolean }[]
  > = this.featureFlagService.getAllDefaultDisabled();

  constructor(
    private store: Store,
    public languageService: LanguageService,
    public featureFlagService: FeatureFlagService
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

  public getThemeName(theme: Theme) {
    switch (theme) {
      case Theme.blue_light_theme: {
        return $localize`:SettingsComponent|Color Theme Option - Blue Light@@SettingsComponentColorThemeBlueLight:Blue Light Theme`;
      }
      case Theme.unicorn_theme: {
        return $localize`:SettingsComponent|Color Theme Option -  Unicorn@@SettingsComponentColorThemeUnicorn:Unicorn Theme`;
      }
      case Theme.blue_dark_theme: {
        return $localize`:SettingsComponent|Color Theme Option -  Blue Dark@@SettingsComponentColorThemeBlueDark:Blue Dark Theme`;
      }
      case Theme.magenta_light_theme: {
        return $localize`:SettingsComponent|Color Theme Option - Magenta Light@@SettingsComponentColorThemeMagentaLight:Magenta Light Theme`;
      }
      case Theme.magenta_dark_theme: {
        return $localize`:SettingsComponent|Color Theme Option - Magenta Dark@@SettingsComponentColorThemeMagentaDark:Magenta Dark Theme`;
      }
      default:
        throw Error(`Translation for theme ${theme} does not exists.`);
    }
  }

  public changeFeatureFlag(event: MatSlideToggleChange, flag: string) {
    this.featureFlagService.set(flag, event.checked);
  }

  public ngOnDestroy() {}
}
