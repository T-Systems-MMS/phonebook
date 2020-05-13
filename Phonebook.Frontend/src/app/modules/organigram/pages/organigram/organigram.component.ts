import { Component, OnInit } from '@angular/core';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { of } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  OrganigramService,
  UnitTreeNode,
  getNodeFromTreeSync,
} from 'src/app/services/api/organigram.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrganigramHelpers } from 'src/app/modules/organigram/helpers';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organigram',
  templateUrl: './organigram.component.html',
  styleUrls: ['./organigram.component.scss'],
  host: { class: 'pb-fill-parent pb-flex-column' },
})
export class OrganigramComponent implements OnInit {
  public params: string[] = [];
  public nodes: UnitTreeNode[] = [];
  public drawerOpenByDefault: boolean = false;
  public dataSource: MatTreeNestedDataSource<UnitTreeNode>;
  public treeControl: NestedTreeControl<UnitTreeNode>;
  public myOrganigramUrl: string[] = [];

  constructor(
    private organigramService: OrganigramService,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.treeControl = new NestedTreeControl<UnitTreeNode>(this._getChildren);
    this.dataSource = new MatTreeNestedDataSource();
    this.organigramService.getOrganigram().subscribe((organigram) => {
      this.dataSource.data = organigram;
    });
  }
  public hasChild = (_: number, nodeData: UnitTreeNode) => nodeData.children.length > 0;

  private _getChildren = (node: UnitTreeNode) => node.children;

  public ngOnInit() {
    if (this.route.firstChild == null) {
      return;
    }
    this.route.firstChild.paramMap.subscribe((paramMap) => {
      this.params = OrganigramHelpers.getParamsAsArray(paramMap, ['node1Id', 'node2Id', 'node3Id']);
      this.updateTreeExtendedState();
    });
    this.router.events
      .pipe(
        untilComponentDestroyed(this),
        filter((event) => event instanceof NavigationEnd && event.url.includes('organigram')),
        switchMap(() => (this.route.firstChild ? this.route.firstChild.paramMap : of(null)))
      )
      .subscribe((params) => {
        if (params != null) {
          this.params = OrganigramHelpers.getParamsAsArray(params, [
            'node1Id',
            'node2Id',
            'node3Id',
          ]);
          this.updateTreeExtendedState();
        }
      });
    this.drawerOpenByDefault = this.breakpointObserver.isMatched('(min-width: 1500px)');
  }

  public updateTreeExtendedState() {
    this.treeControl.collapseAll();
    this.params.forEach((x, i) => {
      const node = getNodeFromTreeSync(this.params.slice(0, i + 1), this.dataSource.data);
      if (node != null) {
        return;
      }
    });
  }
  public ngOnDestroy() {}
  public navigateToNodePath(nodePath: UnitTreeNode) {
    this.router.navigateByUrl(OrganigramHelpers.generateUrlStringFromParamArray([nodePath.name]));
  }
}
