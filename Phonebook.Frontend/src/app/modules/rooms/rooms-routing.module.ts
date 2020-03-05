import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingComponent } from 'src/app/modules/rooms/components/building/building.component';
import { CityComponent } from 'src/app/modules/rooms/components/city/city.component';
import { FloorComponent } from 'src/app/modules/rooms/components/floor/floor.component';
import { OverviewComponent } from 'src/app/modules/rooms/components/overview/overview.component';
import { RoomTreeComponent } from 'src/app/modules/rooms/components/room-tree/room-tree.component';
import { RoomDetailComponent } from 'src/app/modules/rooms/components/room/room.component';

const routes: Routes = [
  {
    path: '',
    component: RoomTreeComponent,
    children: [
      { path: '', component: OverviewComponent, pathMatch: 'full' },
      {
        path: ':cityId',
        component: CityComponent
      },
      {
        path: ':cityId/:buildingId',
        component: BuildingComponent
      },
      {
        path: ':cityId/:buildingId/:floorId',
        component: FloorComponent
      },
      {
        path: ':cityId/:buildingId/:floorId/:roomId',
        component: RoomDetailComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule {}
