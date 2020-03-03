import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActionButtonInterface } from 'src/app/shared/directives/action-drawer/action-drawer.directive';

@Component({
  selector: 'app-drawer-button-sheet',
  templateUrl: './action-drawer-sheet.component.html',
  styleUrls: ['./action-drawer-sheet.component.scss']
})
export class ActionDrawerSheetComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ActionDrawerSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ActionButtonInterface,
    private snackBar: MatSnackBar
  ) {}

  public closeBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }

  public copySuccessToast() {
    this.snackBar.open(
      $localize`:GeneralSuccessMessageCopy|Message displayed when copying a link is successfully@@GeneralSuccessMessageCopy:Copied to clipboard!`,
      '',
      { duration: 2000 }
    );
  }

  public copyErrorToast() {
    this.snackBar.open(
      $localize`:@@GeneralErrorMessageCopy:Couldn't copy to the clipboard, something went wrong. Try again.`,
      '',
      { duration: 2000 }
    );
  }
}
