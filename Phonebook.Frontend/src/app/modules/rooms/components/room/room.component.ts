import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { RoomHelpers } from 'src/app/modules/rooms/helpers';
import { PersonService } from 'src/app/services/api/person.service';
import { BuildingTreeNode, RoomService } from 'src/app/services/api/room.service';
import { MailService } from 'src/app/services/mail.service';
import { WindowRef } from 'src/app/services/windowRef.service';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { Person, Room } from 'src/app/shared/models';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  host: { class: 'pb-height-expand' }
})
export class RoomDetailComponent implements OnInit {
  public room: Room = Room.empty();
  public columns: typeof ColumnDefinitions = ColumnDefinitions;
  public get address(): string[] {
    return this.room.Description.split(',');
  }

  public persons: Person[] = [];
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private mailService: MailService,
    private windowRef: WindowRef,

    private snackBar: MatSnackBar,
    private router: Router,
    private personService: PersonService
  ) {}

  public node: BuildingTreeNode | undefined;

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomService
        .getNodeByPath(RoomHelpers.getParamsAsArray(params, ['cityId', 'buildingId', 'floorId', 'roomId']))
        .subscribe(node => {
          if (node == null) {
            this.snackBar.open(
              $localize`:RoomComponent|Error Message if Room does not exist.@@RoomComponentErrorNoRoom:Room does not exist.`,
              '',
              { duration: 5000 }
            );
            this.router.navigate(['/rooms']);
          }
          if (node != null && node.data != null) {
            this.node = node;
            this.room = this.node.data as Room;
          }
          this.personService
            .getPersonsByRoom(RoomHelpers.getParamsAsArray(params, ['cityId', 'buildingId', 'floorId', 'roomId']))
            .subscribe(person => {
              this.persons = person;
            });
        });
    });
  }

  public sendMail() {
    this.mailService.openMail(
      $localize`:RoomDetailComponent|subject of the email message that is preset when clicking "Share by mail". The room is applied after this sentence.@@RoomDetailComponentMailSubject:Information about the room: ` +
        this.room.Number,
      $localize`:RoomDetailComponent|the body of the email that is preset when clicking "Share by mail". The link to the room is applied after this sentence.@@RoomDetailComponentMailBodyPart1:Here is the Link: ` +
        this.windowRef.getCurrentUrl()
    );
  }

  public getLink() {
    return this.windowRef.getCurrentUrl();
  }
}
