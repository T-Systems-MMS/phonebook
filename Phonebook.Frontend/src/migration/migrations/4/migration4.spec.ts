import { migration4 } from 'src/migration/migrations/4/migration4';

const APPSTATE_KEY: string = 'appstate';

describe('Migration: 4', () => {
  it(migration4.name, () => {
    localStorage.setItem(
      APPSTATE_KEY,
      `{"serviceWorkerNotificationDisplayed":false,"version":"1.0.0","displayedNotificationVersion":1,"sendFeedback":false}`
    );
    migration4.script();
    expect(localStorage.getItem(APPSTATE_KEY)).toEqual(
      `{"serviceWorkerNotificationDisplayed":false,"version":"1.0.0","displayedNotificationVersion":1,"sendFeedback":false,"activeLayout":"view_stream"}`
    );
  });
  it('should do no harm if data is already migrated', () => {
    const alreadyMigratedString = `{"serviceWorkerNotificationDisplayed":false,"version":"1.0.0","displayedNotificationVersion":1,"sendFeedback":false,"activeLayout":"view_module"}`;
    localStorage.setItem(APPSTATE_KEY, alreadyMigratedString);
    migration4.script();
    expect(localStorage.getItem(APPSTATE_KEY)).toEqual(alreadyMigratedString);
  });
});
