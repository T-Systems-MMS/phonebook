import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Building {
  @Field(() => ID)
  id: string;
}
