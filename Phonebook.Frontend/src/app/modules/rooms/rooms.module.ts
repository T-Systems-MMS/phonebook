import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomDetailComponent } from 'src/app/modules/rooms/components/room/room.component';
import { RoomTreeComponent } from 'src/app/modules/rooms/components/room-tree/room-tree.component';
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
import { RoomsRoutingModule } from 'src/app/modules/rooms/rooms-routing.module';
import { BuildingComponent } from './components/building/building.component';
import { CityComponent } from './components/city/city.component';
import { OverviewComponent } from './components/overview/overview.component';
import { FloorComponent } from 'src/app/modules/rooms/components/floor/floor.component';
import { AddFilterModule } from 'src/app/shared/components/add-filter/add-filter.module';
import { ActionDrawerModule } from 'src/app/shared/directives/action-drawer/action-drawer.module';
import { RoomPlanModule } from 'src/app/shared/components/room-plan/room-plan.module';
import { ClipboardModule } from 'ngx-clipboard';
import { AddressModule } from 'src/app/shared/components/address/address.module';
import { PropagationStopModule } from 'ngx-propagation-stop';
import { UserModule } from 'src/app/shared/components/user/user.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
    UserModule
  ],
  declarations: [
    RoomDetailComponent,
    RoomTreeComponent,
    BuildingComponent,
    FloorComponent,
    CityComponent,
    OverviewComponent]
})
export class RoomsModule { }
