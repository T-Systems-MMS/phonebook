import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TableComponent } from 'src/app/modules/table/components//table/table.component';
import { PersonService } from 'src/app/services/api/person.service';
import { Person } from 'src/app/shared/models';
import { SearchState, TableState } from 'src/app/shared/states';

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
        BrowserAnimationsModule,
      ],
      providers: [{ provide: PersonService, useClass: MockPersonService }],
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
