import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Person } from 'src/app/shared/models';
import { AppState } from 'src/app/shared/states';
import { OrganigramService } from 'src/app/services/api/organigram.service';
import { CurrentUserService } from 'src/app/services/api/current-user.service';
import { Router } from '@angular/router';
import { Layout } from 'src/app/shared/models/enumerables/Layout';

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
  @Select(AppState.activeLayout)
  public activeLayout$: Observable<Layout>;
  public layouts: string[] = Object.values(Layout);
  public layout: typeof Layout = Layout;

  constructor(private organigramService: OrganigramService) {}

  public ngOnInit() {
    if (this.currentUser != null) {
      this.organigramService.getOrganigramById(this.currentUser.Id).subscribe((node) => {
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
  }

  public ngOnDestroy(): void {}
}
