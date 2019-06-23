import { Person } from 'src/entity/person/person.entity';
import { generatePerson } from 'src/mock/person';
import { generateRoom } from 'src/mock/room';
import { generateArray } from 'src/mock/util';
import { FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Room } from '../room/room.entity';

@Resolver(Room)
export class RoomResolver {
  @Query(() => [Room])
  async rooms(): Promise<Room[]> {
    return generateArray(45, generateRoom);
  }

  @FieldResolver()
  async occupiedByPersons(@Root() parent: Person): Promise<Person[]> {
    //return Users with ID of the parent...
    console.log(parent);
    return generateArray(3, generatePerson);
  }
}
