import { NgModule } from '@angular/core';
import { FeatureFlagDirective } from 'src/app/modules/feature-flag/feature-flag.directive';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';
import { EnvironmentService } from 'src/app/services/environment.service';

@NgModule({
  providers: [FeatureFlagService, EnvironmentService],
  declarations: [FeatureFlagDirective],
  exports: [FeatureFlagDirective]
})
export class FeatureFlagModule {}
