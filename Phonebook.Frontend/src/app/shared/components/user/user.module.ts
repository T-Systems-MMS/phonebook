import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropagationStopModule } from 'ngx-propagation-stop';
import { UserDetailComponent } from 'src/app/shared/components/user/user-detail/user-detail.component';
import { UserSmallCardComponent } from 'src/app/shared/components/user/user-small-card/user-small-card.component';
import { UserTinyCardComponent } from 'src/app/shared/components/user/user-tiny-card/user-tiny-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoomPlanModule } from 'src/app/shared/components/room-plan/room-plan.module';
import { AddFilterModule } from 'src/app/shared/components/add-filter/add-filter.module';
import { RouterModule } from '@angular/router';
import { ActionDrawerModule } from 'src/app/shared/directives/action-drawer/action-drawer.module';
import { ClipboardModule } from 'ngx-clipboard';
import { ProfilePictureModule } from 'src/app/modules/profile-picture/profile-picture.module';
import { FeatureFlagModule } from 'src/app/modules/feature-flag/feature-flag.module';
import { NgxVcardModule } from 'ngx-vcard';
import { AddressModule } from 'src/app/shared/components/address/address.module';
import { NotImplementedModule } from 'src/app/modules/not-implemented/not-implemented.module';
import { InteractiveAttributeFieldModule } from 'src/app/shared/interactive-attribute-field/interactive-attribute-field.module';

@NgModule({
  imports: [
    CommonModule,
    PropagationStopModule,
    RoomPlanModule,
    AddFilterModule,
    RouterModule,
    ActionDrawerModule,
    ClipboardModule,
    ProfilePictureModule,
    FeatureFlagModule,
    AddressModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgxVcardModule,
    MatTooltipModule,
    NotImplementedModule,
    InteractiveAttributeFieldModule
  ],
  declarations: [UserDetailComponent, UserSmallCardComponent, UserTinyCardComponent],
  exports: [UserDetailComponent, UserSmallCardComponent, UserTinyCardComponent]
})
export class UserModule {}
