import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { ThemeService } from 'src/app/services/theme.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockDirective } from 'ng-mocks';
import { FeatureFlagDirective } from 'src/app/modules/feature-flag/feature-flag.directive';

xdescribe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SettingsComponent, MockDirective(FeatureFlagDirective)],
      providers: [
        { provide: ThemeService, useClass: MockThemeService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockThemeService {
  public getTheme() {
    return 'dark';
  }
}