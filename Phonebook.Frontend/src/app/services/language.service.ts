import { Injectable } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Language } from 'src/app/shared/models/enumerables/Language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private i18n: I18n) {}

  public getLanguage(): Language {
    switch (this.getLangCookie()) {
      case 'de':
        return Language.de;
      case 'en':
        return Language.en;
      default:
        return Language.en;
    }
  }

  public setLanguage(lang: Language) {
    document.cookie = `lang=${lang};path=/;max-age=31536000;domain=.${location.host}`;
    location.href = `${location.protocol}//${location.host}/${lang}/settings`;
  }

  public getLanguageTranslation(lang: Language): string {
    switch (lang) {
      case Language.de:
        return this.i18n({
          value: 'German',
          description: 'GeneralLanguageGerman',
          id: 'GeneralLanguageGerman',
          meaning: 'GeneralLanguageGerman'
        });
      case Language.en:
        return this.i18n({
          value: 'English',
          description: 'GeneralLanguageEnglish',
          id: 'GeneralLanguageEnglish',
          meaning: 'GeneralLanguageEnglish'
        });
      default:
        throw new Error(`No Language Translation specified for '${lang}'!`);
    }
  }

  private getLangCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)lang\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  }
}
