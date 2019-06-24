import { NgModule } from '@angular/core';
import { RoomPlanComponent } from 'src/app/shared/components/room-plan/room-plan.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatIconModule, MatButtonModule],
    declarations: [RoomPlanComponent],
    exports: [RoomPlanComponent]
})
export class RoomPlanModule { }
