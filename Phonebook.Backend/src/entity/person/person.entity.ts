import { ContactInformation } from 'src/entity/contactInformation/contactInformation.entity';
import { Picture } from 'src/entity/picture/picture.entity';
import { Room } from 'src/entity/room/room.entity';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Person {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;
  @Field()
  title: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  role: string;

  @Field(() => Picture)
  picture: Picture;

  @Field()
  costCenter: string;
  roomId: string;

  @Field(() => Room)
  room: Room;

  @Field(() => ContactInformation)
  contactInformation: ContactInformation;
  supervisorIds: string[];

  @Field(() => [Person])
  supervisors: Person[];
  teamAssistantsIds: string[];

  @Field(() => [Person])
  teamAssistants: Person[];

  @Field(() => [String])
  organizationUnits: string[];
}
