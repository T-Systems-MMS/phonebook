import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActionDrawerModule } from 'src/app/shared/directives/action-drawer/action-drawer.module';
import { InteractiveAttributeFieldComponent } from './interactive-attribute-field.component';

@NgModule({
  declarations: [InteractiveAttributeFieldComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, ActionDrawerModule, MatTooltipModule],
  exports: [InteractiveAttributeFieldComponent]
})
export class InteractiveAttributeFieldModule {}
