import { Injectable, Inject } from '@angular/core';
import { WINDOW } from 'src/app/shared/providers/window.provider';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {
    private cache: null | Environment = null;

    constructor(@Inject(WINDOW) private window: Window) { }

    public getEnvironment() {
        if (this.cache == null) {
            this.cache = this.evaluateEnvironment();
            return this.cache;
        } else {
            return this.cache;
        }
    }

    private evaluateEnvironment(): Environment {
        const routerUrl = this.window.location.href;
        if (new RegExp('//preview-phonebook.').test(routerUrl)) {
            return Environment.preview;
        } else if (new RegExp('//phonebook.').test(routerUrl)) {
            return Environment.production;
        } else {
            return Environment.local;
        }
    }

}

export enum Environment {
    local,
    preview,
    production
}
