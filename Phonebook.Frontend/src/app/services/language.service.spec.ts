import { TestBed } from '@angular/core/testing';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { LanguageService } from './language.service';


describe('LanguageService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: I18n, useClass: MockI18nService }]
    })
  );

  it('should be created', () => {
    const service: LanguageService = TestBed.get(LanguageService);
    expect(service).toBeTruthy();
  });
});

class MockI18nService {}
