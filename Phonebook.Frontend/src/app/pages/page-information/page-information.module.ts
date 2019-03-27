import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageInformationComponent } from 'src/app/pages/page-information/page-information.component';
import { MatCardModule, MatButtonModule, MatListModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentService } from 'src/app/services/environment.service';
import { FeedbackDrawerModule } from 'src/app/shared/directives/feedback-drawer/feedback-drawer.module';

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
    FeedbackDrawerModule
  ],
  providers: [EnvironmentService]
})
export class PageInformationModule {}
