import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { PageInformationComponent } from 'src/app/pages/page-information/page-information.component';
import { MatIconModule } from '@angular/material/icon';
import { ContributorsModule } from 'src/app/shared/components/contributors/contributors.module';

const routes: Routes = [
  {
    path: '**',
    component: PageInformationComponent,
  },
];

@NgModule({
  declarations: [PageInformationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    ContributorsModule,
  ],
  providers: [],
})
export class PageInformationModule {}
