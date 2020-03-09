import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { NgxsModule, Store } from '@ngxs/store';
import { MockComponent } from 'ng2-mock-component';
import { BehaviorSubject } from 'rxjs';
import { mockPerson } from 'src/app/shared/mocks/person';
import { Person } from 'src/app/shared/models';
import { SearchState } from 'src/app/shared/states';
import { SearchComponent } from './search.component';

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
      providers: []
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
