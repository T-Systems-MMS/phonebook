/* tslint:disable:variable-name */
export class City {
  public Name: string;
  public Building: string;
  public ZipCode?: any;

  constructor(name: string, building: string, zipCode: any = null) {
    this.Name = name;
    this.Building = building;
    this.ZipCode = zipCode;
  }
}
