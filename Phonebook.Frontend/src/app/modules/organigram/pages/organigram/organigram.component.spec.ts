import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { OrganigramService, UnitTreeNode } from 'src/app/services/api/organigram.service';
import { OrganigramComponent } from './organigram.component';

describe('OrganigramComponent', () => {
  let component: OrganigramComponent;
  let fixture: ComponentFixture<OrganigramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganigramComponent],
      providers: [
        { provide: OrganigramService, useClass: MockOrganigramService },
        { provide: Location, useValue: null }
      ],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganigramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
class MockOrganigramService {
  public getOrganigram(): Observable<UnitTreeNode[]> {
    return of([new UnitTreeNode('id', 'name', 0)]);
  }
}
