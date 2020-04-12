import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { TelephonePipe } from './telephone.pipe';

@NgModule({
  declarations: [TelephonePipe],
  imports: [CommonModule],
  exports: [TelephonePipe],
})
export class PipesModule {
  public static forRoot(): ModuleWithProviders<PipesModule> {
    return {
      ngModule: PipesModule,
      providers: [],
    };
  }
}
