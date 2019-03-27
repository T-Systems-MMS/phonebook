import { RoomsModule } from './rooms.module';

describe('RoomsModule', () => {
  let roomsModule: RoomsModule;

  beforeEach(() => {
    roomsModule = new RoomsModule();
  });

  it('should create an instance', () => {
    expect(roomsModule).toBeTruthy();
  });
});
