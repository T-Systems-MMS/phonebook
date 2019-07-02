import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Theme } from 'src/app/shared/models/enumerables/Theme';

@Injectable()
export class ThemeService {
  constructor(private overlayContainer: OverlayContainer) {}
  public setTheme(themeClass: Theme) {
    const bodyClassList = document.body.classList;
    this.removeThemesFromClassList(bodyClassList);
    bodyClassList.add(themeClass);

    const overlayClassList = this.overlayContainer.getContainerElement().classList;
    this.removeThemesFromClassList(overlayClassList);
    overlayClassList.add(themeClass);
  }

  private removeThemesFromClassList(classList: DOMTokenList) {
    const classes = this.getThemeClassesFromClassList(classList);
    classList.remove(...classes);
  }

  private getThemeClassesFromClassList(classList: DOMTokenList): string[] {
    return Array.from(classList).filter(item => {
      return item.includes('_theme');
    });
  }
}
