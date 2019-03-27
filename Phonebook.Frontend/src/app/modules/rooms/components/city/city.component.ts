import { Component, OnInit } from '@angular/core';
import { BuildingTreeNode, RoomService } from 'src/app/services/api/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomHelpers } from 'src/app/modules/rooms/helpers';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { MatSnackBar } from '@angular/material';
import { BuildingService } from 'src/app/services/api/building.service';
import { Location } from 'src/app/shared/models';
import { RuntimeEnvironmentInterface } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  host: { class: 'pb-height-expand' }
})
export class CityComponent implements OnInit {
  public node: BuildingTreeNode;
  public locations: Location[];
  public runtimeEnvironment: RuntimeEnvironmentInterface = runtimeEnvironment;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,
    private i18n: I18n,
    private snackBar: MatSnackBar,
    private buildingService: BuildingService) { }

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomService.getNodeByPath(RoomHelpers.getParamsAsArray(params, ['cityId', 'buildingId', 'floorId', 'roomId'])).subscribe(node => {
        if (node == null) {
          this.snackBar.open(this.i18n({
            meaning: 'CityComponent',
            description: 'Error Message if City does not exist.',
            id: 'CityComponentErrorNoCity',
            value: 'City does not exist.'
          }), '', { duration: 5000 });
          this.router.navigate(['/rooms']);
        } else {
          this.node = node;
          this.buildingService.getByCity(this.node.name).subscribe(locations => {
            this.locations = locations;
          });
        }
      });
    });
  }

  public navigateToBuilding(building: string) {
    this.router.navigateByUrl(RoomHelpers.generateUrlStringFromParamArray([...this.node!.path, building]));
  }

}
