import { Injectable } from '@angular/core';
import { WindowRef } from 'src/app/services/windowRef.service';

@Injectable()
export class MailService {
  constructor(private windowRef: WindowRef) {}
  public openMail(
    subject: string,
    body: string,
    recipient: string = ''
    //cc: string = '',
    //bcc: string = ''
  ) {
    this.windowRef.nativeWindow.location.href =
      'mailto:' +
      recipient +
      //'?cc=' + cc +
      //'?bcc=' + bcc +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body);
  }
}
