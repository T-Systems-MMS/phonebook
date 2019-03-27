import { async, ComponentFixture, TestBed, TestComponentRenderer } from '@angular/core/testing';

import { AddFilterComponent } from './add-filter.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { SearchState } from 'src/app/shared/states';
import { Component, ViewChild } from '@angular/core';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { AddFilterModule } from 'src/app/shared/components/add-filter/add-filter.module';

describe('AddFilterComponent', () => {
  let cWrapperWithoutDisplayText: TestComponentWrapperWithoutDisplayText;
  let cWrapperAllIO: TestComponentWrapperFullIO;
  let cWrapperWithoutDisplayTextFixture: ComponentFixture<TestComponentWrapperWithoutDisplayText>;
  let cWrapperAllIOFixture: ComponentFixture<TestComponentWrapperFullIO>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapperWithoutDisplayText, TestComponentWrapperFullIO],
      imports: [AddFilterModule, RouterTestingModule, NgxsModule.forRoot([SearchState]), NgxsRouterPluginModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    // Without Display Input Binding
    cWrapperWithoutDisplayTextFixture = TestBed.createComponent(TestComponentWrapperWithoutDisplayText);
    cWrapperWithoutDisplayText = cWrapperWithoutDisplayTextFixture.componentInstance;
    cWrapperWithoutDisplayTextFixture.detectChanges();
    // With All Input Output Bindings
    cWrapperAllIOFixture = TestBed.createComponent(TestComponentWrapperFullIO);
    cWrapperAllIO = cWrapperAllIOFixture.componentInstance;
    cWrapperAllIOFixture.detectChanges();
  });

  it('should create', () => {
    expect(cWrapperWithoutDisplayText.componentUnderTest).toBeTruthy();
    expect(cWrapperAllIO.componentUnderTest).toBeTruthy();
  });

  it('should set displayText if not set', () => {
    expect(cWrapperWithoutDisplayText.componentUnderTest.displayText).toEqual('filter');
  });

  it('should not set displayText if already set', () => {
    expect(cWrapperAllIO.componentUnderTest.displayText).toEqual('someText');
    cWrapperAllIO.filterValue = 'test';
    cWrapperWithoutDisplayTextFixture.detectChanges();
    expect(cWrapperAllIO.componentUnderTest.displayText).toEqual('someText');
  });

  // From DEVCOM-258
  it('should update displayText if not set initially', () => {
    cWrapperWithoutDisplayText.filterValue = 'testText';
    cWrapperWithoutDisplayTextFixture.detectChanges();
    expect(cWrapperWithoutDisplayText.componentUnderTest.displayText).toEqual('testText');
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<app-add-filter [filterColumn]="column" [filterValue]="filterValue"></app-add-filter>'
})
class TestComponentWrapperWithoutDisplayText {
  @ViewChild(AddFilterComponent)
  public componentUnderTest: AddFilterComponent;
  public column = ColumnDefinitions.orgUnit;
  public filterValue = 'filter';
}

@Component({
  selector: 'test-component-wrapper',
  template:
    '<app-add-filter [filterColumn]="column" [filterValue]="filterValue" [displayText]="displayText"></app-add-filter>'
})
class TestComponentWrapperFullIO {
  @ViewChild(AddFilterComponent)
  public componentUnderTest: AddFilterComponent;
  public column = ColumnDefinitions.orgUnit;

  public filterValue = 'filter';
  public displayText = 'someText';
}
