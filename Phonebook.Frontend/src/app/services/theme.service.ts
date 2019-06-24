import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {
  constructor(private overlayContainer: OverlayContainer) {}
  private activeTheme: string =
    Array.from(document.body.classList).find(item => item.includes('-theme')) || 'blue-light-theme';

  public setTheme(themeClass: string) {
    const bodyClassList = document.body.classList;
    this.removeThemesFromClassList(bodyClassList);
    bodyClassList.add(themeClass);

    const overlayClassList = this.overlayContainer.getContainerElement().classList;
    this.removeThemesFromClassList(overlayClassList);
    overlayClassList.add(themeClass);
    this.activeTheme = themeClass;
  }

  public getTheme(): string {
    return this.activeTheme;
  }

  private removeThemesFromClassList(classList: DOMTokenList) {
    const classes = this.getThemeClassesFromClassList(classList);
    classList.remove(...classes);
  }

  private getThemeClassesFromClassList(classList: DOMTokenList): string[] {
    return Array.from(classList).filter(item => {
      return item.includes('-theme');
    });
  }
}
