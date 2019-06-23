import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackDrawerDirective } from './feedback-drawer.directive';
import { FeedbackDrawerSheetComponent } from 'src/app/shared/directives/feedback-drawer/feedback-drawer-sheet/feedback-drawer-sheet.component';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [FeedbackDrawerDirective, FeedbackDrawerSheetComponent],
  imports: [CommonModule, MatListModule, MatButtonModule],
  entryComponents: [FeedbackDrawerSheetComponent],
  exports: [FeedbackDrawerDirective]
})
export class FeedbackDrawerModule {}
