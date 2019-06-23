import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Picture {
  @Field()
  exists: boolean;

  @Field()
  resourceUrl: string;
}
