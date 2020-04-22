import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-dialog-footer',
  templateUrl: './notification-dialog-footer.component.html',
  styleUrls: ['./notification-dialog-footer.component.scss'],
})
export class NotificationDialogFooterComponent implements OnInit {
  constructor(private router: Router) {}

  public ngOnInit(): void {}
  public skipStartDialogs() {
    this.router.navigateByUrl('/?skip_dialog=true');
  }
}
