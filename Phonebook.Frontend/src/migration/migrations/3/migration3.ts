import { Migration } from 'src/migration/Migration';

const APPSTATE_KEY: string = 'appstate';
export const migration3: Migration = {
  name: 'Add activeTheme Property to AppState',
  id: 3,
  script: () => {
    const appStateString = localStorage.getItem(APPSTATE_KEY);
    if (appStateString) {
      const appState: any = JSON.parse(appStateString);
      if (appState.activeTheme === undefined) {
        const newAppState = {
          ...appState,
          activeTheme: 'magenta_light_theme',
        };
        localStorage.setItem(APPSTATE_KEY, JSON.stringify(newAppState));
      }
    }
  },
};
