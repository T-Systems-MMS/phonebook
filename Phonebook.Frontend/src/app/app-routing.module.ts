import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/components/dashboard/dashboard.component';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { environment } from 'src/environments/environment';
import { TeamComponent } from './pages/dashboard/components/team/team.component';
import { BookmarkedComponent } from './pages/dashboard/components/bookmarked/bookmarked.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard/bookmarks', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('src/app/pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'search',
    loadChildren: () => import('src/app/modules/table/table.module').then((m) => m.TableModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('src/app/pages/users/user-pages.module').then((m) => m.UserPagesModule),
  },
  {
    path: 'rooms',
    loadChildren: () => import('src/app/modules/rooms/rooms.module').then((m) => m.RoomsModule),
  },
  {
    path: 'organigram',
    loadChildren: () =>
      import('src/app/modules/organigram/organigram.module').then((m) => m.OrganigramModule),
  },
  {
    path: 'further-information',
    loadChildren: () =>
      import('src/app/pages/page-information/page-information.module').then(
        (m) => m.PageInformationModule
      ),
  },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: environment.routeTracing,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
