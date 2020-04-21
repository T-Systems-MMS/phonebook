import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributorsComponent } from './contributors.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ContributorsComponent],
  imports: [CommonModule, MatIconModule, MatCardModule, MatSnackBarModule],
  exports: [ContributorsComponent],
})
export class ContributorsModule {}
