import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFilterComponent } from 'src/app/shared/components/add-filter/add-filter.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PropagationStopModule } from 'ngx-propagation-stop';

@NgModule({
    imports: [CommonModule, MatTooltipModule, PropagationStopModule],
    declarations: [AddFilterComponent],
    exports: [AddFilterComponent]
})
export class AddFilterModule { }
