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
import { DashboardRoutingModule } from 'src/app/pages/dashboard/dashboard-routing.module';
import { AddFilterModule } from 'src/app/shared/components/add-filter/add-filter.module';
import { AddressModule } from 'src/app/shared/components/address/address.module';
import { UserModule } from 'src/app/shared/components/user/user.module';
import { ActionDrawerModule } from 'src/app/shared/directives/action-drawer/action-drawer.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { TeamComponent } from 'src/app/pages/dashboard/components/team/team.component';
import { BookmarkedComponent } from 'src/app/pages/dashboard/components/bookmarked/bookmarked.component';
import { DashboardComponent } from 'src/app/pages/dashboard/components/overview/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AddFilterModule,
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
    DashboardComponent,
    TeamComponent,
    BookmarkedComponent
  ]
})
export class DashboardModule {}
