import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActionButtonInterface } from 'src/app/shared/directives/action-drawer/action-drawer.directive';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-drawer-button-sheet',
  templateUrl: './action-drawer-sheet.component.html',
  styleUrls: ['./action-drawer-sheet.component.scss']
})
export class ActionDrawerSheetComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ActionDrawerSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ActionButtonInterface,
    private snackBar: MatSnackBar,
    private i18n: I18n
  ) { }

  public closeBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }

  public copySuccessToast() {
    this.snackBar.open(this.i18n({
      id: 'GeneralSuccessMessageCopy',
      value: 'Copied to clipboard!',
      description: 'Message displayed when copying a link is successfully',
      meaning: 'GeneralSuccessMessageCopy'
    }), '', { duration: 2000 });
  }

  public copyErrorToast() {
    this.snackBar.open(
      this.i18n({
        id: 'GeneralErrorMessageCopy',
        value: `Couldn't copy to the clipboard, something went wrong. Try again.`
      }), '', { duration: 2000 });
  }
}
