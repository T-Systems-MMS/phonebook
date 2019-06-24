import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService, BuildingTreeNode, getNodeFromTreeSync } from 'src/app/services/api/room.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { RoomHelpers } from 'src/app/modules/rooms/helpers';
import { filter, switchMap } from 'rxjs/operators';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { of } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { runtimeEnvironment } from 'src/environments/runtime-environment';

@Component({
  selector: 'app-room-tree',
  templateUrl: './room-tree.component.html',
  styleUrls: ['./room-tree.component.scss'],
  host: { class: 'pb-fill-parent pb-flex-column' }
})
export class RoomTreeComponent implements OnInit, OnDestroy {
  public params: string[] = [];
  public treeControl: NestedTreeControl<BuildingTreeNode>;
  public dataSource: MatTreeNestedDataSource<BuildingTreeNode>;
  public drawerOpenByDefault: boolean = false;
  public roomPlanningToolUrl = runtimeEnvironment.roomPlanningToolUrl;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.treeControl = new NestedTreeControl<BuildingTreeNode>(this._getChildren);
    this.dataSource = new MatTreeNestedDataSource();
    this.roomService.getRoomTree().subscribe(tree => {
      this.dataSource.data = tree;
    });
  }

  public hasChild = (_: number, nodeData: BuildingTreeNode) => nodeData.children.length > 0;

  private _getChildren = (node: BuildingTreeNode) => node.children;

  public ngOnInit() {
    if (this.route.firstChild == null) {
      return;
    }
    this.route.firstChild.paramMap.subscribe(paramMap => {
      this.params = RoomHelpers.getParamsAsArray(paramMap, ['cityId', 'buildingId', 'floorId', 'roomId']);
      this.updateTreeExtendedState();
    });
    this.router.events
      .pipe(
        untilComponentDestroyed(this),
        filter(event => event instanceof NavigationEnd && event.url.includes('rooms')),
        switchMap(() => (this.route.firstChild ? this.route.firstChild.paramMap : of(null)))
      )
      .subscribe(params => {
        if (params != null) {
          this.params = RoomHelpers.getParamsAsArray(params, ['cityId', 'buildingId', 'floorId', 'roomId']);
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
        this.treeControl.expand(node);
      }
    });
  }

  public ngOnDestroy() {}
  public options = {};
  public navigateToNodePath(nodePath: string[]) {
    this.router.navigateByUrl(RoomHelpers.generateUrlStringFromParamArray(nodePath));
  }
}
