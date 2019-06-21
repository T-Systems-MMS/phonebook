import { generateBuilding } from 'src/mock/building';
import { generateArray } from 'src/mock/util';
import { Query, Resolver } from 'type-graphql';
import { Building } from './building.entity';

@Resolver(Building)
export class BuildingResolver {
  @Query(() => [Building])
  async buildings(): Promise<Building[]> {
    return generateArray(45, generateBuilding);
  }
}
