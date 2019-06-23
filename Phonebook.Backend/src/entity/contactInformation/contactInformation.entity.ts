import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ContactInformation {
  @Field()
  mobile: string;

  @Field()
  phone: string;

  @Field()
  fax: string;

  @Field()
  email: string;
}
