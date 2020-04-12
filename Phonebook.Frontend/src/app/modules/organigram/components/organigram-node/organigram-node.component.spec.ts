import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { UnitTreeNode } from 'src/app/services/api/organigram.service';
import { WindowRef } from 'src/app/services/windowRef.service';
import { AppState } from 'src/app/shared/states';
import { OrganigramNodeComponent } from './organigram-node.component';

// Still have to figure out how to use Mock NGXS RouterPlugin
xdescribe('OrganigramNodeComponent', () => {
  let component: OrganigramNodeComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTooltipModule, NgxsModule.forRoot([AppState]), NgxsRouterPluginModule.forRoot()],
      declarations: [TestComponentWrapper, OrganigramNodeComponent],
      providers: [{ provide: MatSnackBar, useValue: null }, WindowRef],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<app-organigram-node [node]="node" [(activePath)]="activePath"></app-organigram-node>',
})
class TestComponentWrapper {
  public node: UnitTreeNode = new UnitTreeNode('', '', 0);
  public activePath = '';
}
