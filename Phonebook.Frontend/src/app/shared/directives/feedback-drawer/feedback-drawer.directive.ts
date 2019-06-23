import { Directive, HostListener } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FeedbackDrawerSheetComponent } from 'src/app/shared/directives/feedback-drawer/feedback-drawer-sheet/feedback-drawer-sheet.component';

@Directive({
  selector: '[feedbackDrawer]'
})
export class FeedbackDrawerDirective {
  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    event.stopPropagation();
    this.openBottomSheet();
  }
  constructor(private bottomSheet: MatBottomSheet) {}

  public openBottomSheet() {
    this.bottomSheet.open(FeedbackDrawerSheetComponent, {});
  }
}
