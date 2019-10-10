import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { FeatureFlagModule } from 'src/app/modules/feature-flag/feature-flag.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SettingsComponent } from './settings.component';

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
export class SettingsModule { }
