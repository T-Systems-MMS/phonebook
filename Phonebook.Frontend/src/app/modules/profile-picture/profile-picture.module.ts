import { NgModule } from '@angular/core';
import { ProfilePictureService } from './profile-picture.service';
import { ChangeProfilePictureComponent } from './components/change-profile-picture/change-profile-picture.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { ProfilePictureEnlargeDialog } from './components/profile-picture/enlarge-dialog/profile-picture-enlarge.dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatSnackBarModule, MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatIconModule, MatSnackBarModule, MatButtonModule, MatDialogModule],
  declarations: [ChangeProfilePictureComponent, ProfilePictureComponent, ProfilePictureEnlargeDialog],
  providers: [ProfilePictureService],
  exports: [ChangeProfilePictureComponent, ProfilePictureComponent, ProfilePictureEnlargeDialog],
  entryComponents: [ProfilePictureEnlargeDialog]
})
export class ProfilePictureModule { }
