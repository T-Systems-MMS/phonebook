import { Component, OnInit } from '@angular/core';
import { BuildingTreeNode, RoomService } from 'src/app/services/api/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomHelpers } from 'src/app/modules/rooms/helpers';

import { MatSnackBar } from '@angular/material/snack-bar';
import { BuildingService } from 'src/app/services/api/building.service';
import { Location, City, BuildingPart } from 'src/app/shared/models';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss'],
  host: { class: 'pb-height-expand' }
})
export class BuildingComponent implements OnInit {
  public node: BuildingTreeNode = {
    children: [],
    data: null,
    id: '',
    name: '',
    path: [''],
    type: BuildingPart.building
  };
  public building: Location = new Location(new City('', ''), []);

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,

    private snackBar: MatSnackBar,
    private buildingService: BuildingService
  ) {}

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomService
        .getNodeByPath(RoomHelpers.getParamsAsArray(params, ['cityId', 'buildingId', 'floorId', 'roomId']))
        .subscribe(node => {
          if (node == null) {
            this.snackBar.open(
              $localize`:BuildingComponent|Error Message if Building does not exist.@@BuildingComponentErrorNoBuilding:Building does not exist.`,
              '',
              { duration: 5000 }
            );
            this.router.navigate(['/rooms']);
          } else {
            this.node = node;
            this.buildingService.getByBuilding(this.node.name).subscribe(building => {
              if (building != null) {
                this.building = building;
              }
            });
          }
        });
    });
  }

  public navigateToFloor(floor: BuildingTreeNode) {
    this.router.navigateByUrl(RoomHelpers.generateUrlStringFromParamArray([...this.node!.path, floor.name]));
  }
}
