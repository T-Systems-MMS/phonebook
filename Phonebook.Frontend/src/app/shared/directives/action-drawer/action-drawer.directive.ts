import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Clipboard } from '@angular/cdk/clipboard';
import { ActionDrawerSheetComponent } from 'src/app/shared/directives/action-drawer/action-drawer-sheet/action-drawer-sheet.component';

@Directive({ selector: '[actionDrawer]' })
export class ActionDrawerDirective {
  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    event.stopPropagation();
    // Checks if only one of the actions is true
    if (this.copy && !this.tel && !this.mailto) {
      this.clipboard.copy(this.copy);
      this.snackBar.open(
        $localize`:SuccessMessageCopy|Message displayed if something was copied succesfully@@GeneralSuccessMessageCopy:Copied to clipboard!`,
        '',
        { duration: 2000 }
      );
    } else if (!this.copy && !this.tel && this.mailto) {
      window.open('mailto:${this.tel}', '_blank');
    } else if (!this.copy && this.tel && !this.mailto) {
      window.open('tel:${this.tel}', '_blank');
    } else {
      this.openBottomSheet();
    }
  }
  constructor(
    el: ElementRef,
    private bottomSheet: MatBottomSheet,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  @Input()
  public copy: string | null = null;
  @Input()
  public tel: string | null = null;
  @Input()
  public mailto: string | null = null;

  public openBottomSheet() {
    const actionData: ActionButtonInterface = {
      copy: this.copy,
      tel: this.tel,
      mailto: this.mailto
    };
    this.bottomSheet.open(ActionDrawerSheetComponent, {
      data: actionData
    });
  }
}

export interface ActionButtonInterface {
  copy: string | null;
  tel: string | null;
  mailto: string | null;
}
