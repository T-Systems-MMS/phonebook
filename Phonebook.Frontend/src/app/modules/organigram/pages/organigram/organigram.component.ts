import { Component, OnInit } from '@angular/core';
import { OrganigramService, UnitTreeNode } from 'src/app/services/api/organigram.service';

@Component({
  selector: 'app-organigram',
  templateUrl: './organigram.component.html',
  styleUrls: ['./organigram.component.scss'],
  host: { class: 'pb-expand' }
})
export class OrganigramComponent implements OnInit {
  public nodes: UnitTreeNode[] = [];

  constructor(private organigramService: OrganigramService) { }

  public ngOnInit() {
    this.organigramService.getOrganigram().subscribe(organigram => {
      this.nodes = organigram;
    });
  }
}
