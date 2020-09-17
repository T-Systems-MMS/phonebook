import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from 'src/app/modules/table/components/table/table.component';

const routes: Routes = [
  { path: '', component: TableComponent, pathMatch: 'full' },
  { path: ':keyword', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
