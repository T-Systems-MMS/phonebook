import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { ClipboardService } from 'ngx-clipboard';
import { ActionDrawerSheetComponent } from 'src/app/shared/directives/action-drawer/action-drawer-sheet/action-drawer-sheet.component';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Directive({ selector: '[actionDrawer]' })
export class ActionDrawerDirective {
  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    event.stopPropagation();
    // Checks if only one of the actions is true
    if (this.copy && !this.tel && !this.mailto) {
      this.clipboardService.copyFromContent(this.copy);
      this.snackBar.open(this.i18n({
        id: 'GeneralSuccessMessageCopy',
        value: 'Copied to clipboard!'
      }), '', { duration: 2000 });
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
    private clipboardService: ClipboardService,
    private snackBar: MatSnackBar,
    private i18n: I18n
  ) { }

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
