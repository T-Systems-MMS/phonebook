import { Injectable } from '@angular/core';
import { Widget } from 'src/app/pages/dashboard/widgets/widget.model';
import { BookmarkedComponent } from 'src/app/pages/dashboard/widgets/bookmarked/bookmarked.component';
import { RecentComponent } from 'src/app/pages/dashboard/widgets/recent/recent.component';

@Injectable()
export class WidgetService {
  public getWidgets() {
    return [
      new Widget( BookmarkedComponent),
      new Widget( RecentComponent)
    ];
  }
}
