import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeatureFlagModule } from 'src/app/modules/feature-flag/feature-flag.module';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    FeatureFlagModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  declarations: [SettingsComponent],
  entryComponents: [],
  exports: [SettingsComponent]
})
export class SettingsModule {}
