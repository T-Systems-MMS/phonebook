import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxWidgetGridModule } from 'ngx-widget-grid';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { WidgetsComponent } from 'src/app/pages/dashboard/widgets/widgets.component';
import { BookmarkedComponent } from 'src/app/pages/dashboard/widgets/bookmarked/bookmarked.component';
import { RecentComponent } from 'src/app/pages/dashboard/widgets/recent/recent.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { UserModule } from 'src/app/shared/components/user/user.module';

@NgModule({
  declarations: [DashboardComponent, WidgetsComponent, BookmarkedComponent, RecentComponent],
  imports: [NgxWidgetGridModule, CommonModule, MaterialModule, UserModule],
  exports: [NgxWidgetGridModule, DashboardComponent, WidgetsComponent, BookmarkedComponent, RecentComponent]
})
export class DashboardModule {}
