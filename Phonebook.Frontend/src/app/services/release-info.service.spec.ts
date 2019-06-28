import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { NgxsModule, Store } from '@ngxs/store';
import { ThemeService } from 'src/app/services/theme.service';
import { VersionIncrement } from 'src/app/shared/models/enumerables/VersionIncrement';
import { AppState } from 'src/app/shared/states';
import { ReleaseInfoService } from './release-info.service';

describe('ReleaseInfoService', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule, NgxsModule.forRoot([AppState]), HttpClientModule],
      providers: [
        ReleaseInfoService,
        { provide: I18n, useClass: MockI18nService },
        {
          provide: ThemeService,
          useValue: null
        }
      ]
    });
  });

  it('should be created', inject([ReleaseInfoService], (service: ReleaseInfoService) => {
    expect(service).toBeTruthy();
  }));
});

describe('ReleaseInfoService - whatVersionIncrement()', () => {
  it('should return major increment', () => {
    expect(ReleaseInfoService.whatVersionIncrement('1.0.0', '2.0.0')).toEqual(VersionIncrement.major);
    expect(ReleaseInfoService.whatVersionIncrement('1.0.0', '2.2.0')).toEqual(VersionIncrement.major);
    expect(ReleaseInfoService.whatVersionIncrement('1.0.0', '2.2.2')).toEqual(VersionIncrement.major);
  });
  it('should return minor increment', () => {
    expect(ReleaseInfoService.whatVersionIncrement('1.0.0', '1.1.0')).toEqual(VersionIncrement.minor);
    expect(ReleaseInfoService.whatVersionIncrement('1.0.0', '1.1.1')).toEqual(VersionIncrement.minor);
  });
  it('should return patch increment', () => {
    expect(ReleaseInfoService.whatVersionIncrement('1.0.0', '1.0.1')).toEqual(VersionIncrement.patch);
  });
  it('should return no increment', () => {
    expect(ReleaseInfoService.whatVersionIncrement('1.0.0', '1.0.0')).toEqual(VersionIncrement.none);
    expect(ReleaseInfoService.whatVersionIncrement('1.0.0', '0.1.0')).toEqual(VersionIncrement.none);
    expect(ReleaseInfoService.whatVersionIncrement('1.0.0', '0.0.1')).toEqual(VersionIncrement.none);
    expect(ReleaseInfoService.whatVersionIncrement('0.1.0', '0.0.1')).toEqual(VersionIncrement.none);
  });
  it('should return malformated', () => {
    expect(ReleaseInfoService.whatVersionIncrement('.1.0.0', '1.0.0')).toEqual(VersionIncrement.malformatted);
    expect(ReleaseInfoService.whatVersionIncrement('1.0.0', '1.0.0.')).toEqual(VersionIncrement.malformatted);
    expect(ReleaseInfoService.whatVersionIncrement('0.1.0.0', '1.0.0')).toEqual(VersionIncrement.malformatted);
    expect(ReleaseInfoService.whatVersionIncrement('1.0.0', '1.0.0.02')).toEqual(VersionIncrement.malformatted);
    expect(ReleaseInfoService.whatVersionIncrement('1.0a.0', '1.0.0')).toEqual(VersionIncrement.malformatted);
    expect(ReleaseInfoService.whatVersionIncrement('.1.0.0', '1.%0.0')).toEqual(VersionIncrement.malformatted);
  });
});

class MockI18nService {}
