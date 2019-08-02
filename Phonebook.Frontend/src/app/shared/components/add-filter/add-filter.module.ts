import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PropagationStopModule } from 'ngx-propagation-stop';
import { AddFilterComponent } from 'src/app/shared/components/add-filter/add-filter.component';

@NgModule({
  imports: [CommonModule, MatTooltipModule, PropagationStopModule],
  declarations: [AddFilterComponent],
  exports: [AddFilterComponent]
})
export class AddFilterModule {}
