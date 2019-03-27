import { City } from './City';
import { Room } from './Room';
/* tslint:disable:variable-name */

export class Location {
  public ContactPerson?: any;
  public LinkRoutingWebsite?: any;
  public ReceptionFax?: any;
  public Description?: any;
  public ReceptionPhone?: any;
  public LinkPicture?: any;
  public LinkRoutingInfo?: any;
  public City: City;
  public RoomCollection: Room[];

  constructor(
    city: City,
    roomCollection: Room[],
    contactPerson: any = null,
    linkRoutingWebsite: any = null,
    receptionFax: any = null,
    description: any = null,
    receptionPhone: any = null,
    linkPicture: any = null,
    linkRoutingInfo: any = null
  ) {
    this.City = city;
    this.RoomCollection = roomCollection;
    this.ContactPerson = contactPerson;
    this.LinkRoutingWebsite = linkRoutingWebsite;
    this.ReceptionFax = receptionFax;
    this.Description = description;
    this.ReceptionPhone = receptionPhone;
    this.LinkPicture = linkPicture;
    this.LinkRoutingInfo = linkRoutingInfo;
  }
}
