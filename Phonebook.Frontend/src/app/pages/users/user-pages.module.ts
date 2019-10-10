import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserDetailPageModule } from 'src/app/pages/users/user-detail-page/user-detail-page.module';
import { UserPagesRoutingModule } from 'src/app/pages/users/user-pages-routing.module';

@NgModule({
  imports: [CommonModule, UserPagesRoutingModule, UserDetailPageModule]
})
export class UserPagesModule { }
