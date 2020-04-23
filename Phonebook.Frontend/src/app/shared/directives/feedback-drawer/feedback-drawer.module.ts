import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FeedbackDrawerSheetComponent } from 'src/app/shared/directives/feedback-drawer/feedback-drawer-sheet/feedback-drawer-sheet.component';
import { FeedbackDrawerDirective } from './feedback-drawer.directive';

@NgModule({
  declarations: [FeedbackDrawerDirective, FeedbackDrawerSheetComponent],
  imports: [CommonModule, MatListModule, MatButtonModule],
  entryComponents: [FeedbackDrawerSheetComponent],
  exports: [FeedbackDrawerDirective],
})
export class FeedbackDrawerModule {}
