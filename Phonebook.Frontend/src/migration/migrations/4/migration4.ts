import { Migration } from 'src/migration/Migration';

const APPSTATE_KEY: string = 'appstate';
export const migration4: Migration = {
  name: 'Add currentLayout Property to AppState',
  id: 4,
  script: () => {
    const appStateString = localStorage.getItem(APPSTATE_KEY);
    if (appStateString) {
      const appState: any = JSON.parse(appStateString);
      if (appState.activeLayout === undefined) {
        const newAppState = {
          ...appState,
          activeLayout: 'view_stream',
        };
        localStorage.setItem(APPSTATE_KEY, JSON.stringify(newAppState));
      }
    }
  },
};
