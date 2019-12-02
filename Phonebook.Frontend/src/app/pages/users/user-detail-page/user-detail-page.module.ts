import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserModule } from 'src/app/shared/components/user/user.module';
import { UserDetailPageComponent } from './user-detail-page.component';

@NgModule({
  declarations: [UserDetailPageComponent],
  imports: [CommonModule, UserModule],
  exports: [UserDetailPageComponent]
})
export class UserDetailPageModule {}
