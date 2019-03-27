import { migration1 } from 'src/migration/migrations/1/migration1';

const TABLESTATE_KEY: string = 'tablestate';

describe('Migration: 1', () => {
  it(migration1.name, () => {
    localStorage.setItem(
      TABLESTATE_KEY,
      `{"visibleColumns":[{"id":"picture","title":"Picture","rank":0,"filterable":false,"sortable":false,"fullMatchFilter":false},{"id":"id","title":"Id","rank":100,"filterable":true,"sortable":true,"fullMatchFilter":true},{"id":"name","title":"Name","rank":50,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"email","title":"E-mail","rank":30,"filterable":true,"sortable":false,"fullMatchFilter":false},{"id":"phone","title":"Phone","rank":1,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"mobile","title":"Mobile","rank":1,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"orgUnit","title":"Organization Unit","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"room","title":"Room","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"city","title":"City","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"role","title":"Role","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false}],"tableSort":{"column":null,"direction":""}}`
    );
    migration1.script();
    expect(localStorage.getItem(TABLESTATE_KEY)).toEqual(
      `{"visibleColumns":[{"id":"picture","title":"Picture","rank":0,"filterable":false,"sortable":false,"fullMatchFilter":false},{"id":"id","title":"Id","rank":100,"filterable":true,"sortable":true,"fullMatchFilter":true},{"id":"fullname","title":"Name","rank":50,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"email","title":"E-mail","rank":30,"filterable":true,"sortable":false,"fullMatchFilter":false},{"id":"phone","title":"Phone","rank":1,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"mobile","title":"Mobile","rank":1,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"orgUnit","title":"Organization Unit","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"room","title":"Room","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"city","title":"City","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"role","title":"Role","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false}],"tableSort":{"column":null,"direction":""}}`
    );
  });

  it('should do no harm if already migrated to migration 1', () => {
    const alreadyMigratedString =
      '{"visibleColumns":[{"id":"picture","title":"Picture","rank":0,"filterable":false,"sortable":false,"fullMatchFilter":false},{"id":"id","title":"Id","rank":100,"filterable":true,"sortable":true,"fullMatchFilter":true},{"id":"fullname","title":"Name","rank":50,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"email","title":"E-mail","rank":30,"filterable":true,"sortable":false,"fullMatchFilter":false},{"id":"phone","title":"Phone","rank":1,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"mobile","title":"Mobile","rank":1,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"orgUnit","title":"Organization Unit","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"room","title":"Room","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"city","title":"City","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false},{"id":"role","title":"Role","rank":10,"filterable":true,"sortable":true,"fullMatchFilter":false}],"tableSort":{"column":null,"direction":""}}';
    localStorage.setItem(TABLESTATE_KEY, alreadyMigratedString);
    migration1.script();
    expect(localStorage.getItem(TABLESTATE_KEY)).toEqual(alreadyMigratedString);
  });

  it('should do no harm if already migrated to migration 2', () => {
    const migration2State =
      '{"visibleColumns":["picture","id","fullname","email","phone","mobile","orgUnit","room","city","role"]}';
    localStorage.setItem(TABLESTATE_KEY, migration2State);
    migration1.script();
    expect(localStorage.getItem(TABLESTATE_KEY)).toEqual(migration2State);
  });
});
