import { ModuleWithProviders, NgModule } from '@angular/core';
import { FeatureFlagDirective } from 'src/app/modules/feature-flag/feature-flag.directive';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';

@NgModule({
  declarations: [FeatureFlagDirective],
  exports: [FeatureFlagDirective]
})
export class FeatureFlagModule {
  public static forRoot(): ModuleWithProviders<FeatureFlagModule> {
    return {
      ngModule: FeatureFlagModule,
      providers: [FeatureFlagService]
    };
  }
}
