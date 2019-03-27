import { Messenger } from './Messenger';
/* tslint:disable:variable-name */

export class Contacts {
  public Mobile: string;
  public Fax: string;
  public Email: string;
  public Phone: string;
  public Messenger: Messenger;

  constructor(
    mobile: string,
    fax: string,
    email: string,
    phone: string,
    messenger: Messenger
  ) {
    this.Mobile = mobile;
    this.Fax = fax;
    this.Email = email;
    this.Phone = phone;
    this.Messenger = messenger;
  }
}
