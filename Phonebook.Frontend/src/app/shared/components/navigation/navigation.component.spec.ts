import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { MailService } from 'src/app/services/mail.service';
import { NavigationComponent } from 'src/app/shared/components/navigation/navigation.component';

// Deactivated because there is currently no way to mock environment.ts Version
xdescribe('NavigationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatMenuModule, MatSnackBarModule, BrowserAnimationsModule, HttpClientModule],
      declarations: [
        NavigationComponent,
        MockComponent({ selector: 'app-search' }),
        MockComponent({ selector: 'mat-icon' }),
        MockComponent({ selector: 'mat-list' }),
        MockComponent({ selector: 'mat-list-item' }),
        MockComponent({ selector: 'mat-toolbar' }),
        MockComponent({ selector: 'mat-sidenav-container' }),
        MockComponent({ selector: 'mat-sidenav-content' }),
        MockComponent({ selector: 'mat-sidenav', inputs: ['mode'] })
      ],
      providers: [
        { provide: MailService, useValue: null },
        { provide: MatSnackBar, useValue: null },
        { provide: MatDialog, useValue: null }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(NavigationComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
