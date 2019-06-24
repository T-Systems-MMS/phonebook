import { NgModule } from '@angular/core';
import { ActionDrawerDirective } from 'src/app/shared/directives/action-drawer/action-drawer.directive';
import { ActionDrawerSheetComponent } from 'src/app/shared/directives/action-drawer/action-drawer-sheet/action-drawer-sheet.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { PropagationStopModule } from 'ngx-propagation-stop';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ActionDrawerDirective, ActionDrawerSheetComponent],
  imports: [CommonModule, ClipboardModule, PropagationStopModule, MatButtonModule, MatListModule],
  entryComponents: [ActionDrawerSheetComponent],
  exports: [ActionDrawerDirective]
})
export class ActionDrawerModule {}
