import { Component, OnInit } from '@angular/core';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { of, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  OrganigramService,
  UnitTreeNode,
  getNodeFromTreeSync,
  OrgUnit,
} from 'src/app/services/api/organigram.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OrganigramHelpers } from 'src/app/modules/organigram/helpers';
import { filter, switchMap } from 'rxjs/operators';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { Person } from 'src/app/shared/models';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-organigram',
  templateUrl: './organigram.component.html',
  styleUrls: ['./organigram.component.scss'],
  host: { class: 'pb-fill-parent pb-flex-column' },
})
export class OrganigramComponent implements OnInit {
  public params: string[] = [];
  public currentUser: Person | null = null;
  public drawerOpenByDefault: boolean = false;
  public dataSource: MatTreeNestedDataSource<UnitTreeNode>;
  public treeControl: NestedTreeControl<UnitTreeNode>;
  public whereAmI: string[] = ['/organigram'];
  public nodeName: string[] = [];
  public currentNode: UnitTreeNode;
  constructor(
    private organigramService: OrganigramService,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private currentUserService: CurrentUserService,
    private store: Store
  ) {
    this.treeControl = new NestedTreeControl<UnitTreeNode>(this._getChildren);
    this.dataSource = new MatTreeNestedDataSource();
    this.organigramService.getOrganigramTree().subscribe((organigram) => {
      this.dataSource.data = organigram;
    });
  }
  public hasChild = (_: number, nodeData: UnitTreeNode) => nodeData.children.length > 0;

  private _getChildren = (node: UnitTreeNode) => node.children;

  public ngOnInit() {
    this.currentUserService
      .getCurrentUser()
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (user) => {
          if (user != null) {
            this.currentUser = user;
            this.whereAmI = this.whereAmI.concat(this.currentUser.Business.ShortOrgUnit);
          }
        },
        (error) => {
          this.currentUser = null;
        }
      );
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
      this.currentNode = getNodeFromTreeSync(this.params.slice(0, i + 1), this.dataSource.data);
      if (this.currentNode != null) {
        this.treeControl.expand(this.currentNode);
        this.nodeName.push(this.currentNode.name);
      }
    });
  }
  public ngOnDestroy() {}
  public navigateToNodePath(nodePath: UnitTreeNode) {
    let tree = this.getCurrentRouteAsArray().slice(0, nodePath.depth + 1);
    tree = [...tree, nodePath.id];
    this.store.dispatch(new Navigate(tree));
  }
  public getCurrentRouteAsArray(): string[] {
    const navState = this.store.selectSnapshot(RouterState.state);
    return [
      navState!.root.firstChild!.url[0].path,
      ...navState!.root.firstChild!.firstChild!.firstChild!.url.map((obj) => {
        return obj.path;
      }),
    ];
  }
}
