import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IeWarningComponent } from './ie-warning.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [IeWarningComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  entryComponents: [IeWarningComponent],
  exports: [IeWarningComponent]
})
export class IeWarningModule {}
