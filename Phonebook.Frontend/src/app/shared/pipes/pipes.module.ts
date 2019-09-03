import { TelephonePipe } from './tel.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
