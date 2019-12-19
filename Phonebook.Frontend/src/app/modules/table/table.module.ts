import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProfilePictureModule } from 'src/app/modules/profile-picture/profile-picture.module';
import { TableComponent } from 'src/app/modules/table/components/table/table.component';
import { TableSettingsDialog } from 'src/app/modules/table/dialogs/table-settings-dialog/table-settings.dialog';
import { TableRoutingModule } from 'src/app/modules/table/table-routing.module';
import { AddFilterModule } from 'src/app/shared/components/add-filter/add-filter.module';
import { UserModule } from 'src/app/shared/components/user/user.module';
import { ActionDrawerModule } from 'src/app/shared/directives/action-drawer/action-drawer.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    TableRoutingModule,
    MaterialModule,
    AddFilterModule,
    ActionDrawerModule,
    ProfilePictureModule,
    InfiniteScrollModule,
    UserModule,
    PipesModule
  ],
  declarations: [TableComponent, TableSettingsDialog],
  entryComponents: [TableSettingsDialog]
})
export class TableModule {}
