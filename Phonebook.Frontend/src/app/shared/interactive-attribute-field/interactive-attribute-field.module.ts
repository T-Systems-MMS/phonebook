import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActionDrawerModule } from 'src/app/shared/directives/action-drawer/action-drawer.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { InteractiveAttributeFieldComponent } from './interactive-attribute-field.component';

@NgModule({
  declarations: [InteractiveAttributeFieldComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, ActionDrawerModule, MatTooltipModule, PipesModule],
  exports: [InteractiveAttributeFieldComponent]
})
export class InteractiveAttributeFieldModule {}
