import { NgModule } from '@angular/core';
import { RoomPlanComponent } from 'src/app/shared/components/room-plan/room-plan.component';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, MatIconModule, MatButtonModule],
    declarations: [RoomPlanComponent],
    exports: [RoomPlanComponent]
})
export class RoomPlanModule { }
