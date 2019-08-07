import { Injectable } from '@angular/core';

@Injectable()
export class WindowRef {
  get nativeWindow(): Window {
    return <any>window;
  }

  public getCurrentUrl(): string {
    return this.nativeWindow.location.href;
  }
}

export class Window {
  public baseURL: string;
  public location: { href: string };
  public setTimeout: Function;
}
