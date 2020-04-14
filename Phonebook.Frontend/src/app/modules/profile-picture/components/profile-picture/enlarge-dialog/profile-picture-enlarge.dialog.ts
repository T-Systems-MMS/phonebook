import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-picture-enlarge-dialog',
  templateUrl: './profile-picture-enlarge.dialog.html',
  styleUrls: ['./profile-picture-enlarge.dialog.scss']
})
export class ProfilePictureEnlargeDialog implements OnInit {
  @HostBinding() inputData: any;

  public data: { imageUrl: string; text: string };
  constructor() {
    this.data = this.inputData;
  }

  public ngOnInit() {}
}
