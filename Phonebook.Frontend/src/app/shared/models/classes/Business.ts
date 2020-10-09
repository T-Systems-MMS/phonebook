/* tslint:disable:variable-name */

export class Business {
  public Id: number;
  public ShortBusinessunitTeamassistent: string[];
  public ShortSupervisor: string[];
  public ShortOrgUnit: string[];
  public OrgUnit: string[];
  public BusinessunitTeamassistent: string[];
  public Supervisor: string[];
  public Costcenter: string;

  constructor(
    Id: number,
    shortBusinessunitTeamassistent: string[],
    shortSupervisor: string[],
    shortOrgUnit: string[],
    orgUnit: string[],
    businessunitTeamassistent: string[],
    supervisor: string[],
    costcenter: string
  ) {
    this.Id = Id;
    this.ShortBusinessunitTeamassistent = shortBusinessunitTeamassistent;
    this.ShortSupervisor = shortSupervisor;
    this.ShortOrgUnit = shortOrgUnit;
    this.OrgUnit = orgUnit;
    this.BusinessunitTeamassistent = businessunitTeamassistent;
    this.Supervisor = supervisor;
    this.Costcenter = costcenter;
  }
}
