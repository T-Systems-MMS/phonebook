import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ServiceWorkerService {
  /**
   * Emits on online Status change.
   * True - if online
   * False - if offline
   */
  public onlineStatusEmitter: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  public onlineStatus: Boolean = false;
  constructor() {
    window.addEventListener('load', (event: any) => {
      this.updateOnlineStatus(event);
    });
    window.addEventListener('online', (event: any) => {
      this.updateOnlineStatus(event);
    });
    window.addEventListener('offline', (event: any) => {
      this.updateOnlineStatus(event);
    });
  }

  private updateOnlineStatus(event: any) {
    this.onlineStatus = navigator.onLine;
    this.onlineStatusEmitter.emit(navigator.onLine);
  }
}
