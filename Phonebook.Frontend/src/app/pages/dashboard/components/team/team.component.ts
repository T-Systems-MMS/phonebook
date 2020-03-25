import { BookmarksState, ToggleBookmark, UpdateBookmarkOrder } from 'src/app/shared/states';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CdkDragEnd, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})

export class TeamComponent {
}