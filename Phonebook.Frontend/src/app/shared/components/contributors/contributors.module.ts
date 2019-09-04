import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributorsComponent } from './contributors.component';
import { MatIconModule, MatCardModule } from '@angular/material';

@NgModule({
  declarations: [ContributorsComponent],
  imports: [CommonModule, MatIconModule, MatCardModule],
  exports: [ContributorsComponent]
})
export class ContributorsModule {}
