import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomHelpers } from 'src/app/modules/rooms/helpers';
import { BuildingTreeNode, RoomService } from 'src/app/services/api/room.service';
import { OrganigramService, UnitTreeNode } from 'src/app/services/api/organigram.service';

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

  public navigateToCity(city: BuildingTreeNode) {
    this.router.navigateByUrl(RoomHelpers.generateUrlStringFromParamArray([city.name]));
  }
}
