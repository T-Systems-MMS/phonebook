import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { PropagationStopModule } from 'ngx-propagation-stop';
import { ActionDrawerSheetComponent } from 'src/app/shared/directives/action-drawer/action-drawer-sheet/action-drawer-sheet.component';
import { ActionDrawerDirective } from 'src/app/shared/directives/action-drawer/action-drawer.directive';

@NgModule({
  declarations: [ActionDrawerDirective, ActionDrawerSheetComponent],
  imports: [CommonModule, ClipboardModule, PropagationStopModule, MatButtonModule, MatListModule],
  entryComponents: [ActionDrawerSheetComponent],
  exports: [ActionDrawerDirective]
})
export class ActionDrawerModule {}
