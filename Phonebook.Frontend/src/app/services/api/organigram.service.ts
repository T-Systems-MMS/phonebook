import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, combineLatest } from 'rxjs';
import { map, flatMap, publishReplay, refCount } from 'rxjs/operators';
import { Person } from 'src/app/shared/models';
import { PersonService } from './person.service';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from 'src/app/services/api/current-user.service';

@Injectable()
export class OrganigramService {
  constructor(
    private http: HttpClient,
    private personService: PersonService,
    private currentUserService: CurrentUserService
  ) {}
  public organigram: Observable<UnitTreeNode[]>;
  public orgUnits: Observable<OrgUnit[]>;
  public team: UnitTreeNode;

  public getOrgUnits(): Observable<OrgUnit[]> {
    if (this.orgUnits != null) {
      return this.orgUnits;
    }
    this.orgUnits = this.http.get<OrgUnit[]>('/api/OrgUnit').pipe(
      publishReplay(1), // this tells Rx to cache the latest emitted
      refCount()
    );
    return this.orgUnits;
  }

  public getOrganigramTree(): Observable<UnitTreeNode[]> {
    if (this.organigram != null) {
      return this.organigram;
    }
    this.organigram = this.getOrgUnits().pipe(
      flatMap((d) => this.ConvertOrgUnitsToUnitTree(d)),
      publishReplay(1), // this tells Rx to cache the latest emitted
      refCount()
    );
    return this.organigram;
  }
  public getOrganigramById(id: string): Observable<UnitTreeNode | null> {
    return this.getOrganigramTree().pipe(
      map((orgUnitArray) => {
        const orgUnit = orgUnitArray.find((x) => {
          return x.id === id;
        });
        if (orgUnit === undefined) {
          return null;
        }
        return orgUnit;
      })
    );
  }
  private ConvertOrgUnitsToUnitTree(
    orgUnits: OrgUnit[],
    depth: number = 0
  ): Observable<UnitTreeNode[]> {
    return forkJoin(
      orgUnits.map((o) => {
        let TaShortNames = o.OrgUnitToFunctions.filter((f) => f.RoleName == 'TA').map(
          (t) => t.Person.ShortName
        );
        return forkJoin(
          o.ChildOrgUnits == null || o.ChildOrgUnits.length == 0
            ? of([])
            : this.ConvertOrgUnitsToUnitTree(o.ChildOrgUnits, depth + 1),
          o.HeadOfOrgUnit == null
            ? of(null)
            : this.personService.getById(o.HeadOfOrgUnit.ShortName),
          TaShortNames.length == 0
            ? of([])
            : forkJoin(TaShortNames.map((shortName) => this.personService.getById(shortName))),
          o.ShortName == null ? of([]) : this.personService.getByOrgUnit(o.ShortName)
        ).pipe(
          map(([childs, headofOrgUnit, assistents, members]) => {
            let tree = new UnitTreeNode(
              o.ShortName == null ? '' : o.ShortName,
              o.Name == null ? '' : o.Name,
              depth,
              o.ChildOrgUnits == null ? [] : childs,
              headofOrgUnit == null ? [] : [headofOrgUnit],
              assistents.filter((a) => a != null) as Person[],
              members.filter((p) => p.isLearner() == false),
              members.filter((p) => p.isLearner())
            );
            return tree;
          })
        );
      })
    );
  }

  public getNodeForCurrentUser(): Observable<UnitTreeNode | null> {
    return combineLatest([this.currentUserService.getCurrentUser(), this.getOrganigramTree()]).pipe(
      map(([user, organigram]) => {
        if (user === null) {
          return null;
        }
        return this.getNodeForUser(user, organigram, 0);
      })
    );
  }

  public getNodeForUser(
    user: Person,
    nodeChilds: UnitTreeNode[],
    depth: number
  ): UnitTreeNode | null {
    if (user.Business.ShortOrgUnit.length > depth) {
      for (const node of nodeChilds) {
        if (node.id === user.Business.ShortOrgUnit[depth] && node.depth === depth) {
          return node;
        }
        if (node.id !== user.Business.ShortOrgUnit[depth] && node.depth === depth) {
          continue;
        } else {
          return this.getNodeForUser(user, node.children, depth + 1);
        }
      }
    }
    return null;
  }
}

export class UnitTreeNode {
  public id: string;
  public name: string;
  public children: UnitTreeNode[];
  public supervisors: Person[];
  public assistents: Person[];
  public employees: Person[];
  public learners: Person[];
  public depth: number;
  constructor(
    id: string,
    name: string,
    depth: number,
    children: UnitTreeNode[] = [],
    supervisors: Person[] = [],
    assistents: Person[] = [],
    employees: Person[] = [],
    learners: Person[] = []
  ) {
    this.id = id;
    this.name = name;
    this.depth = depth;
    this.children = children;
    this.supervisors = supervisors;
    this.assistents = assistents;
    this.employees = employees;
    this.learners = learners;
  }
}

class OrgUnit {
  public Id: number;

  public Name?: string;

  public ShortName?: string;

  public ParentId?: number;
  public Parent?: OrgUnit;
  public ChildOrgUnits?: OrgUnit[];

  public HeadOfOrgUnitId?: number;

  public HeadOfOrgUnit?: {
    ShortName: string;
  };

  public CostCenter?: string;
  public OrgUnitToFunctions: {
    PersonId?: number;
    Person: {
      ShortName: string;
    };
    RoleName: string;
  }[];
}
