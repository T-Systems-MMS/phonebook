import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Layout } from 'src/app/shared/models/enumerables/Layout';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    constructor(private overlayContainer: OverlayContainer) {}
    public setLayout(layoutClass: Layout) {
        const bodyClassList = document.body.classList;
        this.removeLayoutFromClassList(bodyClassList);
        bodyClassList.add(layoutClass);

        const overlayClassList = this.overlayContainer.getContainerElement().classList;
        this.removeLayoutFromClassList(overlayClassList);
        overlayClassList.add(layoutClass);
    }

    private removeLayoutFromClassList(classList: DOMTokenList) {
        const classes = this.getLayoutClassesFromClassList(classList);
        classList.remove(...classes);
    }

    private getLayoutClassesFromClassList(classList: DOMTokenList): string [] {
        return Array.from(classList).filter(item => {
            return item.includes('_view');
        });
    }
}
