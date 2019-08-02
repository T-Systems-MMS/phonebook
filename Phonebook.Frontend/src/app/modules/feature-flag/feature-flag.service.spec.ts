import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Environment } from 'src/environments/EnvironmentInterfaces';
import { FeatureFlagService } from './feature-flag.service';

describe('FeatureFlagService', () => {
  let featureFlagServiceTest: FeatureFlagService;
  let httpMock: HttpTestingController;
  const url = '/assets/defaultFeatureFlags.json';

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [FeatureFlagService, { provide: Location, useClass: LocationMock }]
    }).compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    featureFlagServiceTest = TestBed.get(FeatureFlagService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(featureFlagServiceTest).toBeTruthy();
  });

  it(' - Feature should be activated', () => {
    const featureFlag = 'test';
    featureFlagServiceTest.get(featureFlag).subscribe(value => {
      expect(value).toBeTruthy();
    });
    const featureFlagRequest = httpMock.expectOne(url);
    featureFlagRequest.flush({ [featureFlag]: 100 });
  });

  it(' - Feature should be deactivated', () => {
    const featureFlag = 'test';
    featureFlagServiceTest.get(featureFlag).subscribe(value => {
      expect(value).toBeFalsy();
    });
    const featureFlagRequest = httpMock.expectOne(url);
    featureFlagRequest.flush({ [featureFlag]: -1 });
  });

  it(' - Feature should be deactivated by default but turned on by user', () => {
    const featureFlag = 'test';
    featureFlagServiceTest.get(featureFlag).subscribe(value => {
      expect(value).toBeFalsy();
    });
    const featureFlagRequest = httpMock.expectOne(url);
    featureFlagRequest.flush({ [featureFlag]: 0 });
  });

  it(' - not specified Flag is deactivated', () => {
    const featureFlag = 'test';
    featureFlagServiceTest.get(featureFlag).subscribe(value => {
      expect(value).toBeFalsy();
    });
    const featureFlagRequest = httpMock.expectOne(url);
    featureFlagRequest.flush({});
  });

  it(' - FeatureFlag.json not found', () => {
    const featureFlag = 'test';
    featureFlagServiceTest.get(featureFlag).subscribe(value => {
      expect(value).toBeFalsy();
    });
    const featureFlagRequest = httpMock.expectOne(url);
    featureFlagRequest.error(new ErrorEvent(''));
  });

  it(' - is First April Func - Noon', () => {
    const firstAprilNoon = new Date('2011-04-01T00:00:00');
    expect(FeatureFlagService.isFirstApril(firstAprilNoon)).toBeTruthy();
  });

  it(' - is First April Func - Night', () => {
    const firstAprilNight = new Date('2011-04-01T23:59:59');
    expect(FeatureFlagService.isFirstApril(firstAprilNight)).toBeTruthy();
  });

  it(' - is First April Func - Not 1', () => {
    const notfirstApril1 = new Date('2011-04-02T00:00:00');
    expect(FeatureFlagService.isFirstApril(notfirstApril1)).toBeFalsy();
  });

  it(' - is First April Func - Not 2', () => {
    const notfirstApril2 = new Date('2011-03-31T00:00:00');
    expect(FeatureFlagService.isFirstApril(notfirstApril2)).toBeFalsy();
  });
});

class LocationMock {
  public prepareExternalUrl(url: string): string {
    return '/' + url;
  }
}

class MockEnviromentService {
  public getEnvironment(): Environment {
    return Environment.production;
  }
}
