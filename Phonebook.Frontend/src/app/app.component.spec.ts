import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { SwUpdate } from '@angular/service-worker';

import { NgxsModule } from '@ngxs/store';
import { MockDirective } from 'ng-mocks';
import { FeatureFlagDirective } from 'src/app/modules/feature-flag/feature-flag.directive';
import { PersonService } from 'src/app/services/api/person.service';
import { MailService } from 'src/app/services/mail.service';
import { ServiceWorkerService } from 'src/app/services/service-worker.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AppState } from 'src/app/shared/states';
import { AppComponent } from './app.component';
import { FeatureFlagService } from './modules/feature-flag/feature-flag.service';

// Deactivated because there is currently no way to mock environment.ts Version
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AppState]), HttpClientTestingModule, RouterTestingModule],
      declarations: [AppComponent, MockDirective(FeatureFlagDirective)],
      providers: [
        { provide: PersonService, useValue: null },
        { provide: SwUpdate, useValue: null },
        { provide: MailService, useValue: null },
        { provide: MatSnackBar, useValue: null },
        { provide: ServiceWorkerService, useValue: null },
        { provide: FeatureFlagService, useValue: null },
        { provide: MatDialog, useValue: null },
        { provide: ThemeService, useValue: null }
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
