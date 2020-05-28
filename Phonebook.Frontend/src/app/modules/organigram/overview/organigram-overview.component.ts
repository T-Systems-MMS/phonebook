import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganigramService, UnitTreeNode } from 'src/app/services/api/organigram.service';
import { OrganigramHelpers } from 'src/app/modules/organigram/helpers';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-organigram-overview',
  templateUrl: './organigram-overview.component.html',
  styleUrls: ['./organigram-overview.component.scss'],
})
export class OrganigramOverviewComponent implements OnInit {
  public nodes: UnitTreeNode[] = [];

  constructor(
    private organigramService: OrganigramService,
    private router: Router,
    private store: Store
  ) {}

  public ngOnInit() {
    this.organigramService.getOrganigramTree().subscribe((organigram) => {
      this.nodes = organigram;
    });
  }

  public navigateToFirstNode(nodePath: UnitTreeNode) {
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
