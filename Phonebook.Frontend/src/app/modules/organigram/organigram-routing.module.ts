import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganigramComponent } from 'src/app/modules/organigram/pages/organigram/organigram.component';
import { OrganigramOverviewComponent } from 'src/app/modules/organigram/overview/organigram-overview.component';
import { OrganigramNodeComponent } from 'src/app/modules/organigram/components/organigram-node/organigram-node.component';
import { Node1Component } from 'src/app/modules/organigram/node1/node1.component';

const routes: Routes = [
  {
    path: '',
    component: OrganigramComponent,
    children: [
      { path: '', component: OrganigramOverviewComponent, pathMatch: 'full' },
      { path: ':node1Id', component: Node1Component },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganigramRoutingModule {}
