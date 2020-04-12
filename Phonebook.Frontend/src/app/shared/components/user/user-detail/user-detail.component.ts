import { Component, HostListener, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Select, Store } from '@ngxs/store';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { VCard, VCardEncoding } from 'ngx-vcard';
import { Observable } from 'rxjs';
import { MailService } from 'src/app/services/mail.service';
import { WindowRef } from 'src/app/services/windowRef.service';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { Person, PersonStatus } from 'src/app/shared/models';
import { BookmarksState, ToggleBookmark } from 'src/app/shared/states';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { IncorrectUserInformationComponent } from 'src/app/shared/dialogs/user-information/incorrect-user-information.component';
import { runtimeEnvironment } from 'src/environments/runtime-environment';

export interface IncorrectUserInformationDialogData {
  person: Person;
}
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public person: Person;
  public bookmarked: Bookmarked = Bookmarked.isNotBookmarked;
  public status: typeof PersonStatus = PersonStatus;
  public columns: typeof ColumnDefinitions = ColumnDefinitions;
  @Select(BookmarksState)
  public bookmarks$: Observable<Person[]>;
  public vCardEncoding: typeof VCardEncoding = VCardEncoding;
  public get address(): string[] {
    return this.person.Location.RoomCollection[0].Description.split(',');
  }

  public vCard: VCard = {};

  @Input()
  public previewView: boolean = false;
  public rocketChatLink: string | null = null;
  public organigramLink: string[] = ['/organigram'];
  constructor(
    private snackBar: MatSnackBar,
    private mailService: MailService,
    private windowRef: WindowRef,
    private store: Store,
    private dialog: MatDialog
  ) { }

  public ngOnInit() {}

  public ngOnChanges(): void {
    this.rocketChatLink = this.getRocketChatLink();
    this.bookmarks$.pipe(untilComponentDestroyed(this)).subscribe(bookmarks => {
      const index = bookmarks.findIndex(p => p.Id === this.person.Id);
      if (index > -1) {
        this.bookmarked = Bookmarked.isBookmarked;
      } else {
        this.bookmarked = Bookmarked.isNotBookmarked;
      }
    });
    this.vCard = {
      name: {
        firstNames: this.person.Firstname,
        lastNames: this.person.Surname,
        namePrefix: this.person.Title
      },
      kind: 'individual',
      uid: this.person.Id,
      title: this.person.Role,
      role: this.person.Type,
      geoPosition: this.person.Location.City.Name,
      member: this.person.Business.Costcenter,
      email: [{ value: this.person.Contacts.Email, param: { type: 'work' } }],
      workFax: [this.person.Contacts.Fax],
      telephone: [
        { value: this.person.Contacts.Mobile, param: { type: 'cell' } },
        { value: this.person.Contacts.Phone, param: { type: 'work' } }
      ],
      organization: {
        value: 'T-Systems Multimedia Solutions',
        param: { type: ['work'] }
      },
      categories: [...this.person.Business.OrgUnit, ...this.person.Business.ShortOrgUnit],
      nickname: this.person.Id
    };
    this.organigramLink = this.organigramLink.concat(this.person.Business.ShortOrgUnit);
  }

  public sendMail() {
    this.mailService.openMail(
      'Information about ' + this.person.Surname + ' ' + this.person.Firstname,
      'This is the Phonebook Link: ' + this.windowRef.getCurrentUrl()
    );
  }

  public openInformationIncorrectDialog(): void {
    const dialogData: IncorrectUserInformationDialogData = {
      person: this.person
    };
    const dialogConfig: MatDialogConfig = {
      autoFocus: true,
      hasBackdrop: true,
      data: dialogData
    };
    this.dialog.open(IncorrectUserInformationComponent, dialogConfig);
  }
  public getLink() {
    return this.windowRef.getCurrentUrl();
  }

  public toggleBookmark() {
    this.store.dispatch(new ToggleBookmark(this.person));
  }

  public getRocketChatLink(): string | null {
    return runtimeEnvironment.rocketChatUrl !== undefined
      ? runtimeEnvironment.rocketChatUrl + '/direct/' + this.person.Id.toLowerCase()
      : null;
  }

  public ngOnDestroy() { }
}


enum Bookmarked {
  isBookmarked = 'bookmark',
  isNotBookmarked = 'bookmark_border'
}
