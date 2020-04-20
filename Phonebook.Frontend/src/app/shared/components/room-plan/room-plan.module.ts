import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RoomPlanComponent } from 'src/app/shared/components/room-plan/room-plan.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  declarations: [RoomPlanComponent],
  exports: [RoomPlanComponent],
})
export class RoomPlanModule {}
