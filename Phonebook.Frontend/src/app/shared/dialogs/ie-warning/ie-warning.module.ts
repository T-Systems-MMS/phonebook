import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IeWarningComponent } from './ie-warning.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [IeWarningComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  entryComponents: [IeWarningComponent],
  exports: [IeWarningComponent]
})
export class IeWarningModule {}
