import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { environment } from 'src/environments/environment';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { UserDetailPageComponent } from 'src/app/pages/user-detail-page/user-detail-page.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'search', loadChildren: 'src/app/modules/table/table.module#TableModule' },
  { path: 'user/:id', component: UserDetailPageComponent },
  { path: 'rooms', loadChildren: 'src/app/modules/rooms/rooms.module#RoomsModule' },
  { path: 'organigram', loadChildren: 'src/app/modules/organigram/organigram.module#OrganigramModule' },
  {
    path: 'further-information',
    loadChildren: 'src/app/pages/page-information/page-information.module#PageInformationModule'
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
