import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { RoomHelpers } from 'src/app/modules/rooms/helpers';
import { BuildingService } from 'src/app/services/api/building.service';
import { Location } from 'src/app/shared/models';
import { RuntimeEnvironmentInterface } from 'src/environments/EnvironmentInterfaces';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { OrganigramHelpers } from 'src/app/modules/organigram/helpers';
import { OrganigramService, UnitTreeNode } from 'src/app/services/api/organigram.service';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { WindowRef } from 'src/app/services/windowRef.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-node1',
  templateUrl: './node1.component.html',
  styleUrls: ['./node1.component.scss'],
  host: { class: 'pb-height-expand' },
})
export class Node1Component implements OnInit {
  public node: UnitTreeNode;
  public locations: Location[];
  public runtimeEnvironment: RuntimeEnvironmentInterface = runtimeEnvironment;

  constructor(
    private route: ActivatedRoute,
    private organigramService: OrganigramService,
    private router: Router,
    private windowRef: WindowRef,
    private snackBar: MatSnackBar,
    private store: Store,
    private buildingService: BuildingService
  ) {}

  public ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.organigramService
        .getNodeByPath(
          OrganigramHelpers.getParamsAsArray(params, ['node1Id', 'buildingId', 'floorId', 'roomId'])
        )
        .subscribe((node) => {
          if (node == null) {
            this.snackBar.open(
              $localize`:CityComponent|Error Message if City does not exist.@@CityComponentErrorNoCity:City does not exist.`,
              '',
              { duration: 5000 }
            );
            this.router.navigate(['/organigram']);
          } else {
            this.node = node;
            this.buildingService.getByCity(this.node.name).subscribe((locations) => {
              this.locations = locations;
            });
          }
        });
    });
  }

  public getLink() {
    return this.windowRef.getCurrentUrl();
  }
  public generatePath(withNode: boolean): string[] {
    // Get the Path till the depth of the node
    let path = this.getCurrentRouteAsArray().slice(0, this.node.depth + 1);
    //
    if (withNode) {
      path = [...path, this.node.id];
    }
    return path;
  }

  public copiedToast(success: boolean) {
    if (success) {
      this.store.dispatch(new Navigate(this.generatePath(true)));
      this.snackBar.open(
        $localize`:OrganigramNodeComponent|First part of the message displayed when copying a link to the node@@OrganigramNodeComponentCopiedFirstPart:Link to` +
          ' "' +
          this.node.name +
          '" ' +
          $localize`:OrganigramNodeComponent|Second part of the message displayed when copying a link to the node@@OrganigramNodeComponentCopiedSecondPart:copied to clipboard!`,
        '',
        { duration: 2000 }
      );
    } else {
      this.snackBar.open(
        $localize`:GeneralErrorMessageCopy|Message displayed when copying something went wrong@@GeneralErrorMessageCopy:Couldn't copy to the clipboard, something went wrong. Try again.`,
        '',
        { duration: 2000 }
      );
    }
  }
  public getCurrentRouteAsArray(): string[] {
    const navState = this.store.selectSnapshot(RouterState.state);
    return [
      navState!.root.firstChild!.url[0].path,
      ...navState!.root.firstChild!.firstChild!.url.map((obj) => {
        return obj.path;
      }),
    ];
  }

  public navigateToBuilding(building: string) {
    this.router.navigateByUrl(
      RoomHelpers.generateUrlStringFromParamArray([...this.node!.name, building])
    );
  }
}
