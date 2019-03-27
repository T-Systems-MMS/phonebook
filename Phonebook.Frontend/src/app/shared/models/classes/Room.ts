/* tslint:disable:variable-name */

export class Room {
  public Building: string;
  public BuildingId: string;
  public Floor: number;
  public Description: string;
  public Phone: string;
  public Number: string;
  public Id: string;
  public Place: string;
  public FloorPlan: string;

  constructor(
    Building: string,
    BuildingId: string,
    Floor: number,
    Description: string,
    Phone: string,
    Number: string,
    Id: string,
    Place: string,
    FloorPlan: string
  ) {
    this.Building = Building;
    this.BuildingId = BuildingId;
    this.Floor = Floor;
    this.Description = Description;
    this.Phone = Phone;
    this.Number = Number;
    this.Id = Id;
    this.Place = Place;
    this.FloorPlan = FloorPlan;

  }

  public static empty(): Room {
    return new Room('', '', 0, '', '', '', '', '', '');
  }
}
