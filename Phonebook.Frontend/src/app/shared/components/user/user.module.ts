import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { PropagationStopModule } from 'ngx-propagation-stop';
import { NgxVcardModule } from 'ngx-vcard';
import { FeatureFlagModule } from 'src/app/modules/feature-flag/feature-flag.module';
import { NotImplementedModule } from 'src/app/modules/not-implemented/not-implemented.module';
import { ProfilePictureModule } from 'src/app/modules/profile-picture/profile-picture.module';
import { AddFilterModule } from 'src/app/shared/components/add-filter/add-filter.module';
import { AddressModule } from 'src/app/shared/components/address/address.module';
import { RoomPlanModule } from 'src/app/shared/components/room-plan/room-plan.module';
import { UserDetailComponent } from 'src/app/shared/components/user/user-detail/user-detail.component';
import { UserSmallCardComponent } from 'src/app/shared/components/user/user-small-card/user-small-card.component';
import { UserTinyCardComponent } from 'src/app/shared/components/user/user-tiny-card/user-tiny-card.component';
import { ActionDrawerModule } from 'src/app/shared/directives/action-drawer/action-drawer.module';
import { InteractiveAttributeFieldModule } from 'src/app/shared/interactive-attribute-field/interactive-attribute-field.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    PropagationStopModule,
    RoomPlanModule,
    AddFilterModule,
    RouterModule,
    ActionDrawerModule,
    ProfilePictureModule,
    FeatureFlagModule,
    AddressModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgxVcardModule,
    MatTooltipModule,
    NotImplementedModule,
    InteractiveAttributeFieldModule,
    PipesModule,
  ],
  declarations: [UserDetailComponent, UserSmallCardComponent, UserTinyCardComponent],
  exports: [UserDetailComponent, UserSmallCardComponent, UserTinyCardComponent],
})
export class UserModule {}
