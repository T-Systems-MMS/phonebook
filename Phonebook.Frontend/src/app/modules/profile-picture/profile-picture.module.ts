import { NgModule } from '@angular/core';
import { ProfilePictureService } from './profile-picture.service';
import { ChangeProfilePictureComponent } from './components/change-profile-picture/change-profile-picture.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { ProfilePictureEnlargeDialog } from './components/profile-picture/enlarge-dialog/profile-picture-enlarge.dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangeProfilePictureDialogComponent } from './components/change-profile-picture-dialog/change-profile-picture-dialog.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatSnackBarModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule],
  declarations: [
    ChangeProfilePictureComponent,
    ProfilePictureComponent,
    ProfilePictureEnlargeDialog,
    ChangeProfilePictureDialogComponent
  ],
  providers: [ProfilePictureService],
  exports: [ChangeProfilePictureComponent, ProfilePictureComponent, ProfilePictureEnlargeDialog],
  entryComponents: [ProfilePictureEnlargeDialog, ChangeProfilePictureDialogComponent]
})
export class ProfilePictureModule {}
