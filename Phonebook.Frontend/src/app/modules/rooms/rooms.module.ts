import { PipesModule } from './../../shared/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { ClipboardModule } from 'ngx-clipboard';
import { PropagationStopModule } from 'ngx-propagation-stop';
import { FloorComponent } from 'src/app/modules/rooms/components/floor/floor.component';
import { RoomTreeComponent } from 'src/app/modules/rooms/components/room-tree/room-tree.component';
import { RoomDetailComponent } from 'src/app/modules/rooms/components/room/room.component';
import { RoomsRoutingModule } from 'src/app/modules/rooms/rooms-routing.module';
import { AddFilterModule } from 'src/app/shared/components/add-filter/add-filter.module';
import { AddressModule } from 'src/app/shared/components/address/address.module';
import { RoomPlanModule } from 'src/app/shared/components/room-plan/room-plan.module';
import { UserModule } from 'src/app/shared/components/user/user.module';
import { ActionDrawerModule } from 'src/app/shared/directives/action-drawer/action-drawer.module';
import { BuildingComponent } from './components/building/building.component';
import { CityComponent } from './components/city/city.component';
import { OverviewComponent } from './components/overview/overview.component';

@NgModule({
  imports: [
    CommonModule,
    RoomsRoutingModule,
    AddFilterModule,
    RoomPlanModule,
    ClipboardModule,
    ActionDrawerModule,
    AddressModule,
    PropagationStopModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    MatTreeModule,
    MatGridListModule,
    MatRippleModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    UserModule,
    PipesModule
  ],
  declarations: [
    RoomDetailComponent,
    RoomTreeComponent,
    BuildingComponent,
    FloorComponent,
    CityComponent,
    OverviewComponent
  ]
})
export class RoomsModule {}
