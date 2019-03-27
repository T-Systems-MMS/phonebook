import { OrganigramModule } from './organigram.module';

describe('OrganigramModule', () => {
  let organigramModule: OrganigramModule;

  beforeEach(() => {
    organigramModule = new OrganigramModule();
  });

  it('should create an instance', () => {
    expect(organigramModule).toBeTruthy();
  });
});
