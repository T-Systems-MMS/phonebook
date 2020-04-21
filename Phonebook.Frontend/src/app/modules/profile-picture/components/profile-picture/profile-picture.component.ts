import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';
import { Person } from 'src/app/shared/models';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { ProfilePictureService } from '../../profile-picture.service';
import { ProfilePictureEnlargeDialog } from './enlarge-dialog/profile-picture-enlarge.dialog';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit, OnDestroy {
  @Input()
  public set user(person: Person) {
    this.USER = person;
    this.imageLoaded = false;
    this.updateImageUrl();
  }

  public get user(): Person {
    return this.USER;
  }
  @Input()
  public altText: string = '';
  @Input()
  public canEnlargeOnHover: boolean = false;
  @Input()
  public canEnlargeOnClick: boolean = false;
  @Input()
  public imageSize: number = 100;
  private USER: Person = Person.empty();
  private RANDOM: string;
  public imageUrl?: string = undefined;
  public useAprilEndpoint: boolean = false;
  public imageLoaded: boolean = false;
  public dialogRef: MatDialogRef<ProfilePictureEnlargeDialog, any> | null;

  constructor(
    public dialog: MatDialog,
    private profilePictureService: ProfilePictureService,
    private featureFlagService: FeatureFlagService,
    private httpClient: HttpClient,
    private dialogService: DialogService
  ) {}

  public ngOnInit() {
    this.featureFlagService
      .get('firstApril')
      .pipe(untilComponentDestroyed(this))
      .subscribe((flag) => {
        this.useAprilEndpoint = flag;
        if (!flag) {
          this.profilePictureService.reload.pipe(untilComponentDestroyed(this)).subscribe((id) => {
            this.imageLoaded = false;
            if (this.USER.Id.toLowerCase() === id.toLowerCase()) {
              this.RANDOM = Math.random().toString();
              this.updateImageUrl();
            }
          });
        } else {
          this.updateImageUrl();
        }
      });
  }
  private getAprilProfilePictureUrl() {
    const random = Math.floor(Math.random() * Math.floor(9));
    switch (random) {
      case 0:
        return 'assets/img/firstApril/unicorn_1.png';
      case 1:
        return 'assets/img/firstApril/unicorn_2.png';
      case 2:
        return 'assets/img/firstApril/unicorn_3.png';
      case 3:
        return 'assets/img/firstApril/unicorn_4.png';
      case 4:
        return 'assets/img/firstApril/unicorn_5.png';
      case 5:
        return 'assets/img/firstApril/unicorn_6.png';
      case 6:
        return 'assets/img/firstApril/unicorn_7.png';
      case 7:
        return 'assets/img/firstApril/unicorn_8.png';
      case 8:
        return 'assets/img/firstApril/unicorn_9.png';
      case 9:
        return 'assets/img/firstApril/unicorn_10.png';
      case 10:
        return 'assets/img/firstApril/unicorn_11.png';
      case 11:
        return 'assets/img/firstApril/unicorn_12.png';
      default:
        return 'assets/img/firstApril/unicorn_1.png';
    }
  }
  public updateImageUrl() {
    if (runtimeEnvironment.employeePicturesEndpoint !== undefined) {
      if (!this.useAprilEndpoint) {
        if (this.RANDOM) {
          this.imageUrl = `${runtimeEnvironment.employeePicturesEndpoint}/generated/${this.user.Id}/${this.imageSize}.jpg?random=${this.RANDOM}`;
        } else {
          this.imageUrl = `${runtimeEnvironment.employeePicturesEndpoint}/generated/${this.user.Id}/${this.imageSize}.jpg`;
        }
      } else {
        this.imageUrl = this.getAprilProfilePictureUrl();
      }
    }
  }
  public useImage(event: Event) {
    this.imageLoaded = true;
  }

  public onMouseenter(): void {
    if (this.canEnlargeOnHover === false || this.dialogRef != null || this.imageLoaded === false) {
      return;
    }
    this.openEnlarge();
  }

  public onClick() {
    if (this.canEnlargeOnClick === false || this.dialogRef != null || this.imageLoaded === false) {
      return;
    }
    this.openEnlarge();
  }

  public openEnlarge() {
    let url = this.imageUrl;
    const altText = this.altText;
    if (!this.useAprilEndpoint) {
      url = `${runtimeEnvironment.employeePicturesEndpoint}/generated/${this.user.Id}/900.jpg`;
    }

    this.dialogService.displayDialog('profile-picture', { url, altText });
  }
  public ngOnDestroy() {}
}
