import * as faker from 'faker';
import { Building } from 'src/entity/building/building.entity';
export function generateBuilding(): Building {
  return {
    id: faker.random.uuid()
  };
}
