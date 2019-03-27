import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailPageComponent } from './user-detail-page.component';
import { UserModule } from 'src/app/shared/components/user/user.module';

@NgModule({
  declarations: [UserDetailPageComponent],
  imports: [CommonModule, UserModule],
  exports: [UserDetailPageComponent]
})
export class UserDetailPageModule {}
