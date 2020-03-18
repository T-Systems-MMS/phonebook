import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { RoomHelpers } from 'src/app/modules/rooms/helpers';
import { BuildingTreeNode, RoomService } from 'src/app/services/api/room.service';
import { Room } from 'src/app/shared/models';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss'],
  host: { class: 'pb-height-expand' }
})
export class FloorComponent implements OnInit {
  public node: BuildingTreeNode;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,

    private snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomService
        .getNodeByPath(RoomHelpers.getParamsAsArray(params, ['cityId', 'buildingId', 'floorId', 'roomId']))
        .subscribe(node => {
          if (node == null) {
            this.snackBar.open(
              $localize`:FloorComponent|Error Message if Floor does not exist.@@FloorComponentErrorNoFloor:Floor does not exist.`,
              '',
              { duration: 5000 }
            );
            this.router.navigate(['/rooms']);
          } else {
            this.node = node;
          }
        });
    });
  }

  public getFloorplan(): string | null {
    if (this.node.children[0].data != null) {
      return (this.node.children[0].data as Room).FloorPlan;
    }
    return null;
  }
  public navigateToRoom(room: BuildingTreeNode) {
    this.router.navigateByUrl(RoomHelpers.generateUrlStringFromParamArray([...this.node!.path, room.name]));
  }
}
