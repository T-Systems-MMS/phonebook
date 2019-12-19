import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TelephonePipe } from './telephone.pipe';

@NgModule({
  declarations: [TelephonePipe],
  imports: [CommonModule],
  exports: [TelephonePipe]
})
export class PipesModule {
  public static forRoot() {
    return {
      ngModule: PipesModule,
      providers: []
    };
  }
}
