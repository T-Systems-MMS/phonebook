import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { environment } from 'src/environments/environment';
import { UserInformationDialogComponent } from "src/app/shared/dialogs/user-information/user-information-dialog/user-information-dialog.component";

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'search', loadChildren: () => import('src/app/modules/table/table.module').then(m => m.TableModule) },
  { path: 'user', loadChildren: () => import('src/app/pages/users/user-pages.module').then(m => m.UserPagesModule) },
  { path: 'rooms', loadChildren: () => import('src/app/modules/rooms/rooms.module').then(m => m.RoomsModule) },
  {
    path: 'organigram',
    loadChildren: () => import('src/app/modules/organigram/organigram.module').then(m => m.OrganigramModule)
  },
  {
    path: 'further-information',
    loadChildren: () =>
      import('src/app/pages/page-information/page-information.module').then(m => m.PageInformationModule)
  },
  { path: 'user-dialog', component: UserInformationDialogComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: environment.routeTracing,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
