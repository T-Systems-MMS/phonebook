import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TableComponent } from 'src/app/modules/table/components//table/table.component';
import { Person } from 'src/app/shared/models';
import { PersonService } from 'src/app/services/api/person.service';
import { MatDialogModule, MatTableModule, MatSortModule } from '@angular/material';
import { NgxsModule } from '@ngxs/store';
import { SearchState, TableState } from 'src/app/shared/states';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockPersonService {
  public findByKeyword(keyword: String): Person[] {
    return [];
  }

  public getAll(): Person[] {
    return [Person.empty()];
  }
}

xdescribe('ListComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const personSearchService = new MockPersonService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TableComponent],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        NgxsModule.forRoot([SearchState, TableState]),
        MatTableModule,
        MatSortModule,
        InfiniteScrollModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: PersonService, useClass: MockPersonService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
