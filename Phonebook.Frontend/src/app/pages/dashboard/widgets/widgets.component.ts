import { Component, ViewChild, OnInit, ComponentFactoryResolver } from '@angular/core';
import { NgxWidgetGridComponent, WidgetPositionChange } from 'ngx-widget-grid';
import { RecentComponent } from 'src/app/pages/dashboard/widgets/recent/recent.component';
import { BookmarkedComponent } from 'src/app/pages/dashboard/widgets/bookmarked/bookmarked.component';
import { Widget } from 'src/app/pages/dashboard/widgets/widget.model';
import { WidgetService } from 'src/app/pages/dashboard/widgets/widget.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {
  @ViewChild('grid', { static: true }) public grid: NgxWidgetGridComponent;
  public rows = 6;
  public cols = 6;
  public widgets: Widget[];
  public swapWidgets = false;
  public isGridVisible = false;
  public highlightNextPosition = false;
  private _editable = false;
  public gridWidget: any[] = new Array();
  public set editable(editable: boolean) {
    this._editable = editable;
    this.isGridVisible = editable;
  }
  private widgetService: WidgetService = new WidgetService();
  public get editable() {
    return this._editable;
  }
  constructor() {}

  public ngOnInit() {
    this.widgets = this.widgetService.getWidgets();
    this.widgets.forEach(widget => {
      const nextPosition = this.grid.getNextPosition();
      this.gridWidget.push({ component: widget.component, nextPosition });
    });
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
      this.gridWidget.push({ ...nextPosition });
    } else {
      console.warn('No Space Available!! ');
    }
  }

  askDeleteWidget(index) {
    this.widgets.splice(index, 1);
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
