import { ProfilePictureModule } from './profile-picture.module';

describe('ProfilePictureModule', () => {
  let profilePictureModule: ProfilePictureModule;

  beforeEach(() => {
    profilePictureModule = new ProfilePictureModule();
  });

  it('should create an instance', () => {
    expect(profilePictureModule).toBeTruthy();
  });
});
