import { Component, OnDestroy, OnInit } from '@angular/core';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';
import { ServiceWorkerService } from 'src/app/services/service-worker.service';

@Component({
  selector: 'app-online-bar',
  templateUrl: './online-bar.component.html',
  styleUrls: ['./online-bar.component.scss'],
})
export class OnlineBarComponent implements OnInit, OnDestroy {
  public online: Boolean = true;

  constructor(private serviceWorkerService: ServiceWorkerService) {}

  public ngOnInit() {
    this.serviceWorkerService.onlineStatusEmitter
      .pipe(untilComponentDestroyed(this))
      .subscribe((status: Boolean) => {
        this.online = status;
      });
  }
  public ngOnDestroy() {}
}
