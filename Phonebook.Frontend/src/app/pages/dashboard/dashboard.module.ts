import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { DashboardComponent } from 'src/app/pages/dashboard/components/overview/dashboard.component';
import { UserModule } from 'src/app/shared/components/user/user.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { BookmarkedComponent } from 'src/app/pages/dashboard/components/bookmarked/bookmarked.component';
import { TeamComponent } from 'src/app/pages/dashboard/components/team/team.component';
import { DashboardRoutingModule } from 'src/app/pages/dashboard/dashboard-routing.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardComponent, TeamComponent, BookmarkedComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    DragDropModule,
    PipesModule,
    UserModule,
  ],
})
export class DashboardModule {}
