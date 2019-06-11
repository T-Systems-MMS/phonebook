import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProfilePictureEnlargeDialog } from './enlarge-dialog/profile-picture-enlarge.dialog';
import { ProfilePictureService } from '../../profile-picture.service';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';
import { Person } from 'src/app/shared/models';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { HttpClient } from '@angular/common/http';

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
  public imageUrl: string = '';
  public useAprilEndpoint: boolean = false;
  public imageLoaded: boolean = false;
  public dialogRef: MatDialogRef<ProfilePictureEnlargeDialog, any> | null;

  constructor(
    public dialog: MatDialog,
    private profilePictureService: ProfilePictureService,
    private featureFlagService: FeatureFlagService,
    private httpClient: HttpClient
  ) {}

  public ngOnInit() {
    this.featureFlagService
      .get('firstApril')
      .pipe(untilComponentDestroyed(this))
      .subscribe(flag => {
        this.useAprilEndpoint = flag;
        if (!flag) {
          this.profilePictureService.reload.pipe(untilComponentDestroyed(this)).subscribe(id => {
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

  public updateImageUrl() {
    if (!this.useAprilEndpoint) {
      if (this.RANDOM) {
        this.imageUrl = `${runtimeEnvironment.employeePicturesEndpoint}/generated/${this.user.Id}/${
          this.imageSize
        }.jpg?random=${this.RANDOM}`;
      } else {
        this.imageUrl = `${runtimeEnvironment.employeePicturesEndpoint}/generated/${this.user.Id}/${
          this.imageSize
        }.jpg`;
      }
    } else {
      this.httpClient
        .get('/api/april/pictures/' + this.user.Id, {
          responseType: 'text'
        })
        .subscribe(text => {
          this.imageUrl = text;
        });
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
    this.openEnlarge(true);
  }

  public onMouseleave() {
    if (this.canEnlargeOnHover === false) {
      return;
    }
    this.closeEnlarge();
  }

  public openEnlarge(backdrop: boolean = false) {
    let url = this.imageUrl;
    if (!this.useAprilEndpoint) {
      url = `${runtimeEnvironment.employeePicturesEndpoint}/generated/${this.user.Id}/900.jpg`;
    }
    this.dialogRef = this.dialog.open(ProfilePictureEnlargeDialog, {
      hasBackdrop: backdrop,
      data: {
        imageUrl: url,
        text: this.altText
      }
    });
    this.dialogRef.afterClosed().subscribe(closed => {
      this.dialogRef = null;
    });
  }

  public closeEnlarge(): void {
    if (this.dialogRef != null) {
      this.dialogRef.close();
    }
  }

  public ngOnDestroy() {
    this.closeEnlarge();
  }
}
