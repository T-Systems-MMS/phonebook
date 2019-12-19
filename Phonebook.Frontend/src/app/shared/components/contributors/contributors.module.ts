import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributorsComponent } from './contributors.component';
import { MatIconModule, MatCardModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [ContributorsComponent],
  imports: [CommonModule, MatIconModule, MatCardModule, MatSnackBarModule],
  exports: [ContributorsComponent]
})
export class ContributorsModule {}
