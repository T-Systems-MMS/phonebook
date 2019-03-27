import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceWorkerService } from 'src/app/services/service-worker.service';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';

@Component({
  selector: 'app-online-bar',
  templateUrl: './online-bar.component.html',
  styleUrls: ['./online-bar.component.scss']
})
export class OnlineBarComponent implements OnInit, OnDestroy {
  public online: Boolean = true;

  constructor(private serviceWorkerService: ServiceWorkerService) {}

  public ngOnInit() {
    this.serviceWorkerService.onlineStatusEmitter.pipe(untilComponentDestroyed(this)).subscribe((status: Boolean) => {
      this.online = status;
    });
  }
  public ngOnDestroy() {}
}
