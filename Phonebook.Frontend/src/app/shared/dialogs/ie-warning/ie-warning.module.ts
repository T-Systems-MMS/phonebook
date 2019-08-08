import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { IeWarningComponent } from './ie-warning.component';

@NgModule({
  declarations: [IeWarningComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  entryComponents: [IeWarningComponent],
  exports: [IeWarningComponent]
})
export class IeWarningModule {}
