import { migration3 } from './migration3';

const APPSTATE_KEY: string = 'appstate';

describe('Migration: 3', () => {
  it(migration3.name, () => {
    localStorage.setItem(
      APPSTATE_KEY,
      `{"serviceWorkerNotificationDisplayed":false,"version":"1.0.0","displayedNotificationVersion":1,"sendFeedback":false}`
    );
    migration3.script();
    expect(localStorage.getItem(APPSTATE_KEY)).toEqual(
      `{"serviceWorkerNotificationDisplayed":false,"version":"1.0.0","displayedNotificationVersion":1,"sendFeedback":false,"activeTheme":"magenta_light_theme"}`
    );
  });

  it('shoud do no harm if data is already migrated', () => {
    const alreadyMigratedString = `{"serviceWorkerNotificationDisplayed":false,"version":"1.0.0","displayedNotificationVersion":1,"sendFeedback":false,"activeTheme":"blue_dark_theme"}`;
    localStorage.setItem(APPSTATE_KEY, alreadyMigratedString);
    migration3.script();
    expect(localStorage.getItem(APPSTATE_KEY)).toEqual(alreadyMigratedString);
  });
});
