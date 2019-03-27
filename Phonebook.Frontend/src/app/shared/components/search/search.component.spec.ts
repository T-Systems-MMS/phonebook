import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchComponent } from './search.component';
import { Person } from 'src/app/shared/models';
import { mockPerson } from 'src/app/shared/mocks/person';
import { MatIconModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { MockComponent } from 'ng2-mock-component';
import { NgxsModule, Store } from '@ngxs/store';
import { SearchState } from 'src/app/shared/states';
import { I18n } from '@ngx-translate/i18n-polyfill';

class MockSearchService {
  public keyword: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public list: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([mockPerson]);
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent({ selector: 'mat-chip-list' }),
        MockComponent({ selector: 'mat-chip', inputs: ['removable'] }),
        SearchComponent
      ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatSelectModule,
        MatSnackBarModule,
        NgxsModule.forRoot([SearchState])
      ],
      providers: [{ provide: I18n, useClass: MockI18nService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

class MockI18nService {

}