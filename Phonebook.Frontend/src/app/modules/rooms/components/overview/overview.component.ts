import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomHelpers } from 'src/app/modules/rooms/helpers';
import { BuildingTreeNode, RoomService } from 'src/app/services/api/room.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public cities: BuildingTreeNode[] = [];

  constructor(private roomService: RoomService, private router: Router) {}

  public ngOnInit() {
    this.roomService.getRoomTree().subscribe(rooms => {
      this.cities = rooms;
    });
  }

  public navigateToCity(city: BuildingTreeNode) {
    this.router.navigateByUrl(RoomHelpers.generateUrlStringFromParamArray([city.name]));
  }
}
