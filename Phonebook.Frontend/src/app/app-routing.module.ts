import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { environment } from 'src/environments/environment';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { UserDetailPageComponent } from 'src/app/pages/users/user-detail-page/user-detail-page.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'search', loadChildren: () => import('src/app/modules/table/table.module').then(m => m.TableModule) },
  { path: 'user/:id', component: UserDetailPageComponent },
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
  { path: 'settings', component: SettingsComponent }
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
