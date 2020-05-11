import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganigramComponent } from 'src/app/modules/organigram/pages/organigram/organigram.component';
import { OrganigramOverviewComponent } from 'src/app/modules/organigram/overview/organigram-overview.component';

const routes: Routes = [
  {
    path: '',
    component: OrganigramComponent,
    children: [{ path: '', component: OrganigramOverviewComponent, pathMatch: 'full' }],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganigramRoutingModule {}
