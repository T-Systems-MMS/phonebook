import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { PageInformationComponent } from 'src/app/pages/page-information/page-information.component';
import { FeedbackDrawerModule } from 'src/app/shared/directives/feedback-drawer/feedback-drawer.module';
import { MatIconModule } from '@angular/material';
import { ContributorsModule } from 'src/app/shared/components/contributors/contributors.module';

const routes: Routes = [
  {
    path: '**',
    component: PageInformationComponent
  }
];

@NgModule({
  declarations: [PageInformationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatListModule,
    FeedbackDrawerModule,
    MatIconModule,
    ContributorsModule
  ],
  providers: []
})
export class PageInformationModule {}
