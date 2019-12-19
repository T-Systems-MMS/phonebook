import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephone'
})
export class TelephonePipe implements PipeTransform {
  public transform(telephoneNumber: string): string {
    return telephoneNumber.replace(/[^+0-9]/g, '');
  }
}
