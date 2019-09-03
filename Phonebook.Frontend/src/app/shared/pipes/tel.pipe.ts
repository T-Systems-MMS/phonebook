import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'telephone'
})
export class TelephonePipe implements PipeTransform {
  public transform(telNumber: string): string {
    return telNumber.replace(/[^+0-9]/g, '');
  }
}
