import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { FeatureFlagService } from 'src/app/modules/feature-flag/feature-flag.service';
import { Person } from 'src/app/shared/models';
import { runtimeEnvironment } from 'src/environments/runtime-environment';
import { ProfilePictureService } from '../../profile-picture.service';
import { ProfilePictureEnlargeDialog } from './enlarge-dialog/profile-picture-enlarge.dialog';

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
  private getRandomInt() {
    var random =  Math.floor(Math.random() * Math.floor(9)).toString();
    switch (random) {
      case '0': return 'https://cdn.pixabay.com/photo/2020/02/15/17/51/drawing-4851591_960_720.png';
      case '1': return 'https://cdn.pixabay.com/photo/2019/01/30/16/55/unicorn-3964925_960_720.png';
      case '2': return 'https://cdn.pixabay.com/photo/2017/02/01/11/32/characters-2029814_960_720.png';
      case '3': return 'https://cdn.pixabay.com/photo/2019/06/06/14/58/unicorn-4256141_960_720.png';
      case '4': return 'https://cdn.pixabay.com/photo/2018/04/09/20/40/unicorn-3305462_960_720.jpg';
      case '5': return 'https://cdn.pixabay.com/photo/2019/06/22/07/50/unicorn-4291012_960_720.png';
      case '6': return 'https://cdn.pixabay.com/photo/2019/12/20/22/29/unicorn-4709426_960_720.jpg';
      case '7': return 'https://cdn.pixabay.com/photo/2018/04/27/12/58/unicorn-3354612_960_720.png';
      case '8': return 'https://cdn.pixabay.com/photo/2018/09/27/11/58/unicorn-3706878_960_720.png';
      case '9': return 'https://cdn.pixabay.com/photo/2018/12/03/11/23/unicorn-3853216_960_720.png';
      default: return 'https://cdn.pixabay.com/photo/2019/01/30/16/55/unicorn-3964925_960_720.png';
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
        this.imageUrl = this.getRandomInt();
      }
    }else{
      this.imageUrl = this.getRandomInt();
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
