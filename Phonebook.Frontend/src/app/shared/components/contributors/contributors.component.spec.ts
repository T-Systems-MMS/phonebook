import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContributorsComponent } from './contributors.component';
import { MatIconModule, MatCardModule, MatSnackBarModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { I18n } from '@ngx-translate/i18n-polyfill';

describe('ContributorsComponent', () => {
  let component: ContributorsComponent;
  let fixture: ComponentFixture<ContributorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContributorsComponent],
      imports: [HttpClientTestingModule, MatIconModule, MatCardModule, MatSnackBarModule],
      providers: [{ provide: I18n }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
