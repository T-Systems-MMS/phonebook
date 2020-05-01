import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person, PhonebookSortDirection } from 'src/app/shared/models';
import { BookmarksState } from 'src/app/shared/states';
import { OrganigramService, UnitTreeNode } from 'src/app/services/api/organigram.service';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  host: { class: 'pb-dashboard-component' },
})
export class TeamComponent implements OnInit, OnDestroy {
  public currentUser: Person | null = null;
  public teamPersons: Person[];
  public person: Person;

  constructor(
    private store: Store,
    private organigramService: OrganigramService,
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.organigramService.getNodeForCurrentUser().subscribe((node) => {
      if (node != null) {
        this.teamPersons = [
          ...node.supervisors,
          ...node.assistents,
          ...node.employees,
          ...node.learners,
        ];
      }
    });
  }

  public ngOnDestroy(): void {}
}
