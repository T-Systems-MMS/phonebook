import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephone'
})
export class TelephonePipe implements PipeTransform {
  // TODO: #579
  public transform(telephoneNumber: null | string): string {
    return telephoneNumber == null ? '' : telephoneNumber.replace(/[^+0-9]/g, '');
  }
}
