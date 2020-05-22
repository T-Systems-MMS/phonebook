import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganigramComponent } from 'src/app/modules/organigram/pages/organigram/organigram.component';

const routes: Routes = [
  { path: '', component: OrganigramComponent, pathMatch: 'full' },
  { path: ':first', component: OrganigramComponent },
  { path: ':first/:second', component: OrganigramComponent },
  { path: ':first/:second/:third', component: OrganigramComponent },
  { path: ':first/:second/:third/:fourth', component: OrganigramComponent },
  { path: ':first/:second/:third/:fourth/:fifth', component: OrganigramComponent },
  { path: ':first/:second/:third/:fourth/:fifth/:sixth', component: OrganigramComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganigramRoutingModule {}
