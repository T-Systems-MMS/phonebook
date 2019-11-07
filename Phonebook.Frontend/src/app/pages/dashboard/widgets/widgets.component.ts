import { Component, ViewChild, ComponentFactoryResolver, AfterViewInit, ViewContainerRef } from '@angular/core';
import { NgxWidgetGridComponent, WidgetPositionChange, Rectangle, NgxWidgetComponent } from 'ngx-widget-grid';
import { RecentComponent } from 'src/app/pages/dashboard/widgets/recent/recent.component';
import { BookmarkedComponent } from 'src/app/pages/dashboard/widgets/bookmarked/bookmarked.component';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements AfterViewInit {
  @ViewChild('grid', { static: true }) public grid: NgxWidgetGridComponent;
  @ViewChild('dynamicComponent', { static: true, read: ViewContainerRef }) container: ViewContainerRef;
  public rows: number = 6;
  public cols: number = 11;
  public swapWidgets: boolean = false;
  public isGridVisible: boolean = false;
  private _editable: boolean = false;
  private highlightNextPosition: boolean = false;
  bookmarkedWidget: boolean = false;
  recentWidget: boolean = false;
  public set editable(editable: boolean) {
    this._editable = editable;
  }
  private widgets: any[] = new Array();
  public get editable() {
    return this._editable;
  }
  public ngAfterViewInit() {
    this.widgets.push(
      { position: new Rectangle({ top: 1, left: 1, width: 9, height: 6 }) },
      { position: new Rectangle({ top: 1, left: 10, width: 2, height: 6 }) }
    );
  }
  toggleGridVisibility() {
    this.isGridVisible = !this.isGridVisible;
    return this.isGridVisible;
  }
  getPosition(componentName: string) {
    switch (componentName) {
      case 'bookmarked': {
        return this.widgets[0].position;
      }
      case 'recent': {
        return this.widgets[1].position;
      }
      default:
        return this.grid.getNextPosition();
    }
  }
  doRows(add: boolean) {
    if (add) {
      this.rows++;
    } else {
      if (this.rows > 1) {
        this.rows--;
      }
    }
  }
  doCols(add: boolean) {
    if (add) {
      this.cols++;
    } else {
      if (this.cols > 1) {
        this.cols--;
      }
    }
  }
}
