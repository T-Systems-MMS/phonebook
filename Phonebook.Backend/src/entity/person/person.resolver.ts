import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultApi } from 'src/connectors/generated/people-source/api';
import { Configuration } from 'src/connectors/generated/people-source/configuration';
import { Person } from 'src/entity/person/person.entity';
import { Room } from 'src/entity/room/room.entity';
import { generatePerson } from 'src/mock/person';
import { generateRoom } from 'src/mock/room';
import { generateArray } from 'src/mock/util';
import { Arg, Args, ArgsType, Field, FieldResolver, ID, Query, Resolver, Root } from 'type-graphql';
@ArgsType()
class GetPersonsArgs {
  @Field({ nullable: true })
  searchString: string;

  @Field({ nullable: true })
  filter: string;
}

let config: Configuration = {
  basePath: 'https://demo-phonebook.me/api'
} as any;

@Resolver(Person)
export class PersonResolver {
  @Query(() => [Person])
  async getPersons(@Args() args: GetPersonsArgs): Promise<Person[]> {
    console.log(args);
    return from(new DefaultApi(config).personsGet())
      .pipe(
        map(res => res.data),
        map(a =>
          a.map((p: any) => {
            let person: Person = {
              id: p.Id || '',
              type: p.Type || '',
              title: p.Title || '',
              lastName: p.Surname || '',
              firstName: p.Firstname || '',
              role: p.Role || '',
              picture: {
                exists: true,
                resourceUrl: `https://pictures.demo-phonebook.me/${p.Id}`
              },
              contactInformation: {
                email: p.Contacts!.Rmail || '',
                fax: p.Contacts!.Fax!,
                mobile: p.Contacts!.Mobile!,
                phone: p.Contacts!.Phone!
              },
              costCenter: p.Business!.Costcenter!,
              organizationUnits: p.Business!.OrgUnit!,
              roomId: p.Location!.RoomCollection![0]!.Id!,
              room: {
                id: p.Location!.RoomCollection![0]!.Id!,
                number: p.Location!.RoomCollection![0]!.Number!,
                occupiedByPersonIds: [],
                roomPlanUrl: `url...`,
                occupiedByPersons: []
              },
              supervisorIds: [],
              supervisors: [],
              teamAssistants: [],
              teamAssistantsIds: []
            };
            return person;
          })
        )
      )
      .toPromise();
  }

  @Query(() => Person)
  async getPerson(@Arg('id', () => ID!) id: string): Promise<Partial<Person>> {
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
    todo(parent);
    return generateRoom();
  }
}

function todo(t: any): void {
  t = t;
}
