import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotImplementedService {
  constructor(private snackBar: MatSnackBar) {}

  public notImplemented() {
    this.snackBar
      .open('This Feature is not implemented yet.', 'Hold my beer!', { duration: 3000 })
      .onAction()
      .subscribe(clicked => {
        window.open('https://github.com/T-Systems-MMS/phonebook/projects/1', '_blank');
      });
  }
}
