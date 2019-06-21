import { Person } from 'src/entity/person/person.entity';
import { Room } from 'src/entity/room/room.entity';
import { generatePerson } from 'src/mock/person';
import { generateRoom } from 'src/mock/room';
import { generateArray } from 'src/mock/util';
import { Arg, Args, ArgsType, Field, FieldResolver, Query, Resolver, Root } from 'type-graphql';

@ArgsType()
class GetPersonsArgs {
  @Field({ nullable: true })
  searchString: string;

  @Field({ nullable: true })
  filter: string;
}

@Resolver(Person)
export class PersonResolver {
  @Query(() => [Person])
  async getPersons(@Args() args: GetPersonsArgs): Promise<Person[]> {
    console.log(args);
    return generateArray(1, generatePerson);
  }

  @Query(() => Person)
  async getPerson(@Arg('id') id: string): Promise<Partial<Person>> {
    console.log(id);
    return generatePerson();
  }

  @FieldResolver()
  async supervisors(@Root() parent: Person): Promise<Person[]> {
    //return Users with ID of the parent...
    console.log(parent);
    return generateArray(3, generatePerson);
  }

  @FieldResolver()
  async teamAssistants(@Root() parent: Person): Promise<Person[]> {
    //return Users with ID of the parent...
    console.log(parent);
    return generateArray(3, generatePerson);
  }

  @FieldResolver()
  async room(@Root() parent: Person): Promise<Room> {
    //return Users with ID of the parent...
    console.log(parent);
    return generateRoom();
  }
}
