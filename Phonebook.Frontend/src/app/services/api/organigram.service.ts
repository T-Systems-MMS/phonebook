import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, flatMap, publishReplay, refCount } from 'rxjs/operators';
import { Person } from 'src/app/shared/models';
import { PersonService } from './person.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrganigramService {
  constructor(private http: HttpClient, private personService: PersonService) {}
  public organigram: Observable<UnitTreeNode[]>;
  public getOrganigram(): Observable<UnitTreeNode[]> {
    if (this.organigram != null) {
      return this.organigram;
    }
    this.organigram = this.http.get<OrgUnit[]>('/api/OrgUnit').pipe(
      flatMap((d) => this.ConvertOrgUnitsToUnitTree(d)),
      publishReplay(1), // this tells Rx to cache the latest emitted
      refCount()
    );
    return this.organigram;
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
  public getNodeByPath(pathArray: string[], level: number = 0): Observable<UnitTreeNode | null> {
    return this.getOrganigram().pipe(
      flatMap((tree) => {
        return of(getNodeFromTreeSync(pathArray, tree, level));
      })
    );
  }
}

export function getNodeFromTreeSync(
  paramArray: string[],
  tree: UnitTreeNode[],
  level: number = 0
): UnitTreeNode | null {
  if (paramArray.length === 1) {
    return (
      tree.find((node) => {
        return node.name === paramArray[0];
      }) || null
    );
  } else {
    const nextNode = tree.find((node) => {
      return node.name === paramArray[0];
    });
    if (nextNode == null || nextNode.children.length === 0) {
      return null;
    }
    return getNodeFromTreeSync(
      paramArray.slice(1, paramArray.length),
      nextNode.children,
      level + 1
    );
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
