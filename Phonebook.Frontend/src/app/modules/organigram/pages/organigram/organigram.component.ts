import { Component, OnInit } from '@angular/core';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { of } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OrganigramService, UnitTreeNode } from 'src/app/services/api/organigram.service';
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
      this.params = OrganigramHelpers.getParamsAsArray(paramMap, [
        'cityId',
        'buildingId',
        'floorId',
        'roomId',
      ]);
      this.updateTreeExtendedState();
    });
    this.router.events
      .pipe(
        untilComponentDestroyed(this),
        filter((event) => event instanceof NavigationEnd && event.url.includes('rooms')),
        switchMap(() => (this.route.firstChild ? this.route.firstChild.paramMap : of(null)))
      )
      .subscribe((params) => {
        if (params != null) {
          this.params = OrganigramHelpers.getParamsAsArray(params, [
            'cityId',
            'buildingId',
            'floorId',
            'roomId',
          ]);
          this.updateTreeExtendedState();
        }
      });
    this.drawerOpenByDefault = this.breakpointObserver.isMatched('(min-width: 1500px)');
  }

  public updateTreeExtendedState() {
    this.treeControl.collapseAll();
    this.params.forEach((x, i) => {
      const node = UnitTreeNode;

      if (node != null) {
        return;
      }
    });
  }
  public navigateToNodePath(nodePath: string[]) {
    this.router.navigateByUrl(OrganigramHelpers.generateUrlStringFromParamArray(nodePath));
  }
}
