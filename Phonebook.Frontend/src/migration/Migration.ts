import { migration1, migration2, migration3, migration4 } from 'src/migration/migrations/';

const MIGRATIONS: Migration[] = [migration1, migration2, migration3, migration4];
const MIGRATION_KEY: string = 'PhonebookMigrationLevel';

export function migrate(): number | undefined {
  if (!localStorage) {
    // Nothing to migrate
    return undefined;
  }
  let migrationLevel = getMigrationLevel();

  MIGRATIONS.forEach(migration => {
    if (migration.id > migrationLevel) {
      migration.script();
      migrationLevel = migration.id;
    }
  });
  setMigrationLevel(migrationLevel);
  return migrationLevel;
}

function getMigrationLevel(): number {
  return Number(localStorage.getItem(MIGRATION_KEY) || '0');
}

function setMigrationLevel(level: number) {
  localStorage.setItem(MIGRATION_KEY, String(level));
}

export interface Migration {
  name: string;
  id: number;
  script();
}
