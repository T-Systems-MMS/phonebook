import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganigramService, UnitTreeNode } from 'src/app/services/api/organigram.service';
import { OrganigramHelpers } from 'src/app/modules/organigram/helpers';

@Component({
  selector: 'app-organigram-overview',
  templateUrl: './organigram-overview.component.html',
  styleUrls: ['./organigram-overview.component.scss'],
})
export class OrganigramOverviewComponent implements OnInit {
  public nodes: UnitTreeNode[] = [];

  constructor(private organigramService: OrganigramService, private router: Router) {}

  public ngOnInit() {
    this.organigramService.getOrganigram().subscribe((organigram) => {
      this.nodes = organigram;
    });
  }

  public navigateToFirstNode(node1: UnitTreeNode) {
    this.router.navigateByUrl(OrganigramHelpers.generateUrlStringFromParamArray([node1.name]));
  }
}
