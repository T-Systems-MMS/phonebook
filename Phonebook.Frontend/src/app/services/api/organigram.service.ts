import { Injectable } from '@angular/core';
import { Observable, combineLatest, UnsubscriptionError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from 'src/app/shared/models';
import { PersonService } from './person.service';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
@Injectable()
export class OrganigramService {
  constructor(private personService: PersonService, private currentUserService: CurrentUserService) {}

  public getOrganigram(): Observable<UnitTreeNode[]> {
    return this.personService.getAll().pipe(
      map(users => {
        const tree: UnitTreeNode[] = [];
        users.forEach(person => {
          if (person.Business.ShortOrgUnit.length === 0) {
            return;
          }
          this.findNodeForPerson(person, tree, 0);
        });
        return tree;
      })
    );
  }

  /**
   * Finds the Person's Node in the Hierarchical Structure of Units (generates the Units along its way.)
   * @param person  The person for whom you like to find the node
   * @param nodeChilds The Childs of the node your are currently searching in.
   * @param depth The depth of the Tree (to map the Persons Array of Units to the Tree structure)
   */
  public findNodeForPerson(person: Person, nodeChilds: UnitTreeNode[], depth: number) {
    const firstnode = nodeChilds.find(node => {
      return node.id === person.Business.ShortOrgUnit[depth];
    });
    if (firstnode === undefined) {
      const newNode = new UnitTreeNode(person.Business.ShortOrgUnit[depth], person.Business.OrgUnit[depth], depth);
      if (depth === person.Business.ShortOrgUnit.length - 1) {
        this.pushToSpecificGroup(newNode, person);
      } else if (person.Business.ShortOrgUnit.length - 1 > depth) {
        this.findNodeForPerson(person, newNode.children, depth + 1);
      }
      nodeChilds.push(newNode);
    } else {
      if (depth === person.Business.ShortOrgUnit.length - 1) {
        this.pushToSpecificGroup(firstnode, person);
        return;
      } else {
        this.findNodeForPerson(person, firstnode.children, depth + 1);
      }
    }
  }

  public getUnitForUser(): Observable<UnitTreeNode[] | null> {
    return combineLatest([this.currentUserService.getCurrentUser(), this.getOrganigram()]).pipe(
      map(([user, organigram]) => {
        if (user != null) {
          organigram.forEach(node0 => {
            if (node0.name === user.Business.OrgUnit[0]) {
              node0.children.forEach(node1 => {
                if (node1.name === user.Business.OrgUnit[1]) {
                  node1.children.forEach(node2 => {
                    if (node2.name === user.Business.OrgUnit[2]) {
                      console.log(node2);
                      return node2;
                    }
                  });
                }
              });
            }
          });
        }
        return null;
      })
    );
  }

  public pushToSpecificGroup(node: UnitTreeNode, person: Person) {
    if (person.isLearner()) {
      node.learners.push(person);
    } else if (person.isSupervisor()) {
      node.supervisors.push(person);
    } else if (person.isAssistent()) {
      node.assistents.push(person);
    } else {
      node.employees.push(person);
    }
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
