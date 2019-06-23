import { generateBuilding } from 'src/mock/building';
import { generateArray } from 'src/mock/util';
import { Arg, ID, Query, Resolver } from 'type-graphql';
import { Building } from './building.entity';

@Resolver(Building)
export class BuildingResolver {
  @Query(() => [Building])
  async buildings(): Promise<Building[]> {
    return generateArray(45, generateBuilding);
  }

  @Query(() => Building)
  async building(@Arg('id', () => ID!) id: string): Promise<Building> {
    console.log(id);
    return generateBuilding();
  }
}
