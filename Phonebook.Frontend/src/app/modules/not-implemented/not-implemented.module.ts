import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotImplementedDirective } from 'src/app/modules/not-implemented/not-implemented.directive';
import { NotImplementedService } from 'src/app/modules/not-implemented/not-implemented.service';

@NgModule({
  imports: [CommonModule],
  providers: [NotImplementedService],
  declarations: [NotImplementedDirective],
  exports: [NotImplementedDirective],
})
export class NotImplementedModule {}
