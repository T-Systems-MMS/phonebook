import { TestBed, async } from '@angular/core/testing';
import { FeatureFlagDirective } from 'src/app/modules/feature-flag/feature-flag.directive';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ServiceWorkerService } from 'src/app/services/service-worker.service';
import { PersonService } from 'src/app/services/api/person.service';
import { SwUpdate } from '@angular/service-worker';
import { MailService } from 'src/app/services/mail.service';
import { NgxsModule } from '@ngxs/store';
import { AppState } from 'src/app/shared/states';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeatureFlagService } from './modules/feature-flag/feature-flag.service';
import { AppComponent } from './app.component';
import { MockDirective } from 'ng-mocks';
import { I18n } from '@ngx-translate/i18n-polyfill';

// Deactivated because there is currently no way to mock environment.ts Version
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AppState])],
      declarations: [AppComponent, MockDirective(FeatureFlagDirective)],
      providers: [
        { provide: PersonService, useValue: null },
        { provide: SwUpdate, useValue: null },
        { provide: MailService, useValue: null },
        { provide: MatSnackBar, useValue: null },
        { provide: ServiceWorkerService, useValue: null },
        { provide: FeatureFlagService, useValue: null },
        { provide: MatDialog, useValue: null },
        { provide: I18n, useClass: MockI18nService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

class MockI18nService {

}
