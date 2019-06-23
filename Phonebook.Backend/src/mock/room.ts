import * as faker from 'faker';
import { Room } from 'src/entity/room/room.entity';
export function generateRoom(): Room {
  return {
    id: faker.random.uuid(),
    number: `${faker.random.number(200)}a`,
    roomPlanUrl: faker.internet.url()
  };
}
