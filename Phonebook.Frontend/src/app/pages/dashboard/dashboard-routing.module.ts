import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/components/overview/dashboard.component';
import { BookmarkedComponent } from 'src/app/pages/dashboard/components/bookmarked/bookmarked.component';
import { TeamComponent } from 'src/app/pages/dashboard/components/team/team.component';
import { HasBookmarksGuard } from 'src/app/pages/dashboard/has-bookmarks.guard';
import { IsAuthenticatedGuard } from 'src/app/shared/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'bookmarks',
        component: BookmarkedComponent,
        pathMatch: 'full',
        canActivate: [HasBookmarksGuard],
      },
      {
        path: 'team',
        component: TeamComponent,
        canActivate: [IsAuthenticatedGuard],
        data: { guard: { redirectTo: '/dashboard/bookmarks' } },
      },
    ],
  },
  { path: '**', redirectTo: 'bookmarks' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
