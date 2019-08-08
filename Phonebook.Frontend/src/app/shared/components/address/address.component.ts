import { Component, Input, OnInit } from '@angular/core';
import { ColumnDefinitions } from 'src/app/shared/config/columnDefinitions';
import { Location } from 'src/app/shared/models';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input()
  public location: Location;
  public columns: typeof ColumnDefinitions = ColumnDefinitions;
  public get address(): string[] {
    return this.location.RoomCollection[0].Description.split(',');
  }

  constructor() {}

  public ngOnInit() {}
}
