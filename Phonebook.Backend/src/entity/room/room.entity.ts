import { Field, ID, ObjectType } from 'type-graphql';
import { Person } from '../person/person.entity';

@ObjectType()
export class Room {
  @Field(() => ID)
  id: string;

  @Field()
  number: string;

  @Field()
  roomPlanUrl: string;

  occupiedByPersonIds: string[];
  @Field(() => [Person])
  occupiedByPersons: Person[];
}
