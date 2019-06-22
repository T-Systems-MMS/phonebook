import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UnitTreeNode } from 'src/app/services/api/organigram.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WindowRef } from 'src/app/services/windowRef.service';
import { Store } from '@ngxs/store';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'app-organigram-node',
  templateUrl: './organigram-node.component.html',
  styleUrls: ['./organigram-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganigramNodeComponent implements OnInit {
  @Input()
  public node: UnitTreeNode;
  public expand: Expanded = Expanded.isNotExpanded;
  public expanded: typeof Expanded = Expanded;
  @ViewChild('thisNode', { static: true })
  public thisNode: ElementRef;

  constructor(private snackBar: MatSnackBar, private windowRef: WindowRef, private store: Store, private i18n: I18n) { }

  public ngOnInit() {
    const nodePath = this.getCurrentRouteAsArray();
    if (nodePath[this.node.depth + 1] === this.node.id) {
      // Expand if this node is along the current Route
      this.expand = Expanded.isExpanded;
      if (nodePath.length === this.node.depth + 2) {
        // Scroll to this node if it is the leave of the route
        (this.thisNode.nativeElement as HTMLElement).scrollIntoView();
      }
    }
  }

  public toggleExpand() {
    if (this.expand === Expanded.isExpanded) {
      this.expand = Expanded.isNotExpanded;
      this.store.dispatch(new Navigate(this.generatePath(false)));
    } else {
      this.expand = Expanded.isExpanded;
      this.store.dispatch(new Navigate(this.generatePath(true)));
    }
  }

  public getLink() {
    return this.windowRef.getCurrentUrl();
  }

  public generatePath(withNode: boolean): string[] {
    // Get the Path till the depth of the node
    let path = this.getCurrentRouteAsArray().slice(0, this.node.depth + 1);
    //
    if (withNode) {
      path = [...path, this.node.id];
    }
    return path;
  }

  public linkCopiedToast() {
    this.store.dispatch(new Navigate(this.generatePath(true)));
    this.snackBar.open(
      this.i18n({
        meaning: 'OrganigramNodeComponent',
        description: 'First part of the message displayed when copying a link to the node',
        id: 'OrganigramNodeComponentCopiedFirstPart',
        value: 'Link to'
      }) +
      ' "' +
      this.node.name +
      '" ' +
      this.i18n({
        meaning: 'OrganigramNodeComponent',
        description: 'Second part of the message displayed when copying a link to the node',
        id: 'OrganigramNodeComponentCopiedSecondPart',
        value: 'copied to clipboard!'
      }),
      '',
      { duration: 2000 }
    );
  }

  public linkErrorToast() {
    this.snackBar.open(
      this.i18n({
        meaning: 'GeneralErrorMessageCopy',
        description: 'Message displayed when copying something went wrong',
        id: 'GeneralErrorMessageCopy',
        value: `Couldn't copy to the clipboard, something went wrong. Try again.`
      }),
      '',
      { duration: 2000 }
    );
  }

  public getCurrentRouteAsArray(): string[] {
    const navState = this.store.selectSnapshot(RouterState.state);
    return [
      navState.root.firstChild.url[0].path,
      ...navState.root.firstChild.firstChild.url.map(obj => {
        return obj.path;
      })
    ];
  }
}

enum Expanded {
  isExpanded = 'expand_less',
  isNotExpanded = 'expand_more'
}
