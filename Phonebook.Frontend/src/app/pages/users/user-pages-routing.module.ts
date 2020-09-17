import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailPageComponent } from 'src/app/pages/users/user-detail-page/user-detail-page.component';
import { UserDetailPageResolver } from 'src/app/pages/users/user-detail-page/user-detail-page.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: UserDetailPageComponent,
    resolve: {
      user: UserDetailPageResolver,
    },
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [UserDetailPageResolver],
  exports: [RouterModule],
})
export class UserPagesRoutingModule {}
