import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AddFilterModule } from 'src/app/shared/components/add-filter/add-filter.module';
import { AddressComponent } from 'src/app/shared/components/address/address.component';

@NgModule({
  imports: [CommonModule, RouterModule, AddFilterModule, MatListModule, MatButtonModule, MatIconModule],
  declarations: [AddressComponent],
  exports: [AddressComponent]
})
export class AddressModule {}
