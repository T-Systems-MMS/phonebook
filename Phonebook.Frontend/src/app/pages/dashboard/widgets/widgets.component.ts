import { Component, ViewChild, ComponentFactoryResolver, AfterViewInit, ViewContainerRef } from '@angular/core';
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';
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
  public cols: number = 6;
  public swapWidgets: boolean = false;
  public isGridVisible: boolean = false;
  public highlightNextPosition: boolean = false;
  private _editable: boolean = false;
  bookmarkedWidget: boolean = false;
  recentWidget: boolean = false;
  public set editable(editable: boolean) {
    this._editable = editable;
  }
  private widgets: any[];
  public get editable() {
    return this._editable;
  }
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  public ngAfterViewInit() {
    this.widgets.push(this.grid.getNextPosition());

    this.widgets.push(this.grid.getNextPosition());
  }
  toggleHighlight(doHighlight: boolean) {
    this.highlightNextPosition = !doHighlight;
  }
  toggleGridVisibility() {
    this.isGridVisible = !this.isGridVisible;
    return this.isGridVisible;
  }
  getPosition(componentName) {
    switch (componentName) {
      case 'bookmarked': {
        console.log('asd');
        return this.widgets[0].getPosition();
      }
      case 'recent': {
        return this.widgets[1];
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
