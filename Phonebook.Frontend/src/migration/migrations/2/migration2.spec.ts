import { migration2 } from 'src/migration/migrations/2/migration2';

const TABLESTATE_KEY: string = 'tablestate';

describe('Migration: 2', () => {
  it(migration2.name, () => {
    localStorage.setItem(
      TABLESTATE_KEY,
      `{"visibleColumns":[{"id":"picture","title":"Picture","rank":0,"filterable":false,"sortable":false,"fullMatchFilter":false},{"id":"id","title":"Id","rank":100,"filterable":true,"sortable":true,"fullMatchFilter":true},{"id":"fullname","title":"Name","rank":50,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"email","title":"E-mail","rank":30,"filterable":true,"sortable":false,"fullMatchFilter":false},{"id":"phone","title":"Phone","rank":1,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"mobile","title":"Mobile","rank":1,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"orgUnit","title":"Organization Unit","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"room","title":"Room","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"city","title":"City","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"role","title":"Role","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false}],"tableSort":{"column":null,"direction":""}}`
    );
    migration2.script();
    expect(localStorage.getItem(TABLESTATE_KEY)).toEqual(
      `{"visibleColumns":["picture","id","fullname","email","phone","mobile","orgUnit","room","city","role"]}`
    );
  });

  it('shoud do no harm if data is already migrated', () => {
    const alreadyMigratedString = `{"visibleColumns":["picture","id","fullname","email","phone","mobile","orgUnit","room","city","role"]}`;
    localStorage.setItem(TABLESTATE_KEY, alreadyMigratedString);
    migration2.script();
    expect(localStorage.getItem(TABLESTATE_KEY)).toEqual(alreadyMigratedString);
  });
});
