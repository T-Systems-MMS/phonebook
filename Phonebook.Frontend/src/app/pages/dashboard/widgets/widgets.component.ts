import { Component, ViewChild, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';
import { RecentComponent } from 'src/app/pages/dashboard/widgets/recent/recent.component';
import { BookmarkedComponent } from 'src/app/pages/dashboard/widgets/bookmarked/bookmarked.component';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {
  @ViewChild('grid', { static: true }) public grid: NgxWidgetGridComponent;
  @ViewChild('parent', { static: true}) private parent: any;
  public rows: number = 6;
  public cols: number = 6;
  public swapWidgets: boolean = false;
  public isGridVisible: boolean = false;
  public highlightNextPosition: boolean = false;
  private _editable: boolean = false;
  public gridWidget: any[] = new Array();
  public set editable(editable: boolean) {
    this._editable = editable;
  }
  private widgets: any[] = new Array();
  public get editable() {
    return this._editable;
  }
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public ngOnInit() {
    const bookmarked = this.componentFactoryResolver.resolveComponentFactory(BookmarkedComponent);
    this.widgets.push(this.parent.createComponent(bookmarked));
  }
  toggleHighlight(doHighlight: boolean) {
    this.highlightNextPosition = !!doHighlight;
  }
  showGrid() {
    this.isGridVisible = !this.isGridVisible;
    return this.isGridVisible;
  }
  addWidget() {
    const nextPosition = this.grid.getNextPosition();
    if (nextPosition) {
      this.gridWidget.push({ widget: this.widgets[0], ...nextPosition });
    }
  }

  askDeleteWidget(index) {
    this.gridWidget.splice(index, 1);
  }

  deleteWidget() {}

  onWidgetChange(event: WidgetPositionChange) {}

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
