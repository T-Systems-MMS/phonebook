import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { MockDirective } from 'ng-mocks';
import { MockComponent } from 'ng2-mock-component';
import { WINDOW_PROVIDER } from 'src/app/shared/providers/window.provider';
import { PageInformationComponent } from './page-information.component';

xdescribe('PageInformationComponent', () => {
  let component: PageInformationComponent;
  let fixture: ComponentFixture<PageInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, RouterTestingModule],
      declarations: [
        PageInformationComponent,
        MockComponent({ selector: 'mat-card' }),
        MockComponent({ selector: 'mat-card-title' }),
        MockComponent({ selector: 'mat-card-header' }),
        MockComponent({ selector: 'mat-card-content' }),
        MockComponent({ selector: 'mat-card-subtitle' })
      ],
      providers: [WINDOW_PROVIDER],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
