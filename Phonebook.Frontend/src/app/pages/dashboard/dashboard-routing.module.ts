import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkedComponent } from 'src/app/pages/dashboard/components/bookmarked/bookmarked.component';
import { TeamComponent } from 'src/app/pages/dashboard/components/team/team.component';
import { DashboardComponent } from 'src/app/pages/dashboard/components/overview/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: BookmarkedComponent, pathMatch: 'full' },
      {
        path: ':team',
        component: TeamComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}