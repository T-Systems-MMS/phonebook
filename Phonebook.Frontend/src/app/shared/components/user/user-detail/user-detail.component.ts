import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Select, Store } from '@ngxs/store';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { VCard, VCardEncoding } from 'ngx-vcard';
import { Observable } from 'rxjs';
import { MailService } from 'src/app/services/mail.service';
import { WindowRef } from 'src/app/services/windowRef.service';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { Person, PersonType } from 'src/app/shared/models';
import { BookmarksState, ToggleBookmark } from 'src/app/shared/states';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  @Input()
  public person: Person;
  public bookmarked: Bookmarked = Bookmarked.isNotBookmarked;
  public type: typeof PersonType = PersonType;
  public columns: typeof ColumnDefinitions = ColumnDefinitions;
  @Select(BookmarksState)
  public bookmarks$: Observable<Person[]>;
  public randomMoney: string;
  public vCardEncoding: typeof VCardEncoding = VCardEncoding;
  public get address(): string[] {
    return this.person.Location.RoomCollection[0].Description.split(',');
  }

  public vCard: VCard = {};

  @Input()
  public previewView: boolean = false;
  constructor(
    private snackBar: MatSnackBar,
    private mailService: MailService,
    private windowRef: WindowRef,
    private store: Store,
    private i18n: I18n
  ) {}

  public ngOnInit() {
    this.getRandomMoney();
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
      categories: [
        ...this.person.Business.OrgUnit,
        ...this.person.Business.ShortOrgUnit
      ],
      nickname: this.person.Id
    };
  }

  public sendMail() {
    this.mailService.openMail(
      'Information about ' + this.person.Surname + ' ' + this.person.Firstname,
      'This is the Phonebook Link: ' + this.windowRef.getCurrentUrl()
    );
  }

  public getLink() {
    return this.windowRef.getCurrentUrl();
  }

  public toggleBookmark() {
    this.store.dispatch(new ToggleBookmark(this.person));
  }

  public ngOnDestroy() {}

  @HostListener('click')
  public getRandomMoney(): void {
    this.randomMoney = (Math.random() * 1000000).toFixed(2);
  }
}

enum Bookmarked {
  isBookmarked = 'bookmark',
  isNotBookmarked = 'bookmark_border'
}
