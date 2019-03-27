import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ProfilePictureService } from 'src/app/modules/profile-picture/profile-picture.service';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.scss']
})
export class ChangeProfilePictureComponent implements OnInit {
  @Input()
  public userId: string;
  public currentUserId: string = '';

  constructor(
    private profilePictureService: ProfilePictureService,
    private currentUserService: CurrentUserService,
    private snackBar: MatSnackBar,
    private i18n: I18n
  ) {}

  public ngOnInit() {
    this.currentUserService.getCurrentUserId().subscribe(id => {
      this.currentUserId = id;
    });
  }

  public isVisible(): boolean {
    return this.userId.toLowerCase() === this.currentUserId.toLowerCase();
  }

  public uploadFile(event: Event) {
    // This is import because of firefox https://stackoverflow.com/questions/5301643/how-can-i-make-event-srcelement-work-in-firefox-and-what-does-it-mean
    const eventElement = event.target || event.srcElement;
    const files = (eventElement as HTMLInputElement).files;
    if (files != null && files.length > 0) {
      const file: File = files[0];
      const fileSize: number = file.size;
      (eventElement as HTMLInputElement).value = '';
      if (file.type !== 'image/jpeg') {
        this.snackBar
          .open(
            this.i18n({
              meaning: 'ChangeProfilePictureComponent',
              description: 'Error Message if wrong File Type is supplied',
              id: 'ChangeProfilePictureComponentErrorWrongFileType',
              value: 'Currently only JPEG images are supported.'
            }),
            this.i18n({
              meaning: 'ChangeProfilePictureComponent',
              description: 'Button on Error Message if wrong File Type is supplied',
              id: 'ChangeProfilePictureComponentErrorWrongFileTypeButton',
              value: 'I want to add more support!'
            }),
            {
              duration: 3000
            }
          )
          .onAction()
          .subscribe(clicked => {
            window.open('https://github.com/T-Systems-MMS/phonebook/issues/2', '_blank');
          });
        return;
      }
      if (fileSize <= 10485760) {
        this.profilePictureService.uploadUserPicture(file).subscribe(
          success => {
            this.snackBar.open(
              this.i18n({
                meaning: 'ChangeProfilePictureComponent',
                description: 'Success Message if profile picture was updated',
                id: 'ChangeProfilePictureComponentSuccessUpdate',
                value: 'Updated your Profile Picture!'
              }),
              '',
              {
                duration: 3000
              }
            );
            this.profilePictureService.reload.emit(this.userId);
          },
          error => {
            this.snackBar.open(
              this.i18n({
                meaning: 'GeneralErrorMessage',
                description: 'A general Error message, that can be displayed everywhere',
                id: 'GeneralErrorMessage',
                value: 'Something went wrong. Please try again.'
              }),
              '',
              {
                duration: 3000
              }
            );
          }
        );
      } else {
        this.snackBar.open(
          this.i18n({
            meaning: 'ChangeProfilePictureComponent',
            description: 'Error Message if supplied file size is to big (without size and unit)',
            id: 'ChangeProfilePictureComponentErrorFileSize',
            value: 'File should be smaller than'
          }) + ' 10MB',
          '',
          {
            duration: 3000
          }
        );
      }
    }
    (eventElement as HTMLInputElement).value = '';
  }

  public deleteProfilePicture() {
    this.profilePictureService.deleteUserPicture().subscribe(
      success => {
        this.snackBar.open(
          this.i18n({
            meaning: 'ChangeProfilePictureComponent',
            description: 'Success Message if user deleted its profile picture',
            id: 'ChangeProfilePictureComponentSuccessDelete',
            value: 'Your profile picture was deleted!'
          }),
          '',
          {
            duration: 3000
          }
        );
        this.profilePictureService.reload.emit(this.userId);
      },
      error => {
        this.snackBar.open(
          this.i18n({
            id: 'GeneralErrorMessage',
            value: 'Something went wrong. Please try again.'
          }),
          '',
          {
            duration: 3000
          }
        );
      }
    );
  }
}
