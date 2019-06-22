import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-picture-enlarge-dialog',
  templateUrl: './profile-picture-enlarge.dialog.html',
  styleUrls: ['./profile-picture-enlarge.dialog.scss']
})
export class ProfilePictureEnlargeDialog implements OnInit {
  public data: { imageUrl: string; text: string };
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.data = data;
  }

  public ngOnInit() {}
}
