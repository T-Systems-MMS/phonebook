import { migration5 } from './migration5';

const TABLESTATE_KEY: string = 'tablestate';

describe('Migration 5', () => {
  it(migration5.name, () => {
    localStorage.setItem(TABLESTATE_KEY, '{}');
    migration5.script();
    expect(localStorage.getItem(TABLESTATE_KEY)).toEqual(
      '{"visibleBigColumns":["picture","id","fullname","email","phone","mobile","orgUnit","room","city","role"],"visibleSmallColumns":["picture","id","fullname","email","room","role"]}'
    );
  });
  it(migration5.name, () => {
    localStorage.setItem(
      TABLESTATE_KEY,
      '{"visibleColumns":["picture","id","email","phone","mobile","orgUnit","room","city","role"]}'
    );
    migration5.script();
    expect(localStorage.getItem(TABLESTATE_KEY)).toEqual(
      '{"visibleBigColumns":["picture","id","email","phone","mobile","orgUnit","room","city","role"],"visibleSmallColumns":["picture","id","fullname","email","room","role"]}'
    );
  });
  it('should do no harm if it is already migrated', () => {
    const alreadyMigratedString =
      '{"visibleBigColumns":["id","email","phone","mobile","orgUnit","room","city","role"],"visibleSmallColumns":["id","fullname","email","room","role"]}';
    localStorage.setItem(TABLESTATE_KEY, alreadyMigratedString);
    migration5.script();
    expect(localStorage.getItem(TABLESTATE_KEY)).toEqual(alreadyMigratedString);
  });
});
