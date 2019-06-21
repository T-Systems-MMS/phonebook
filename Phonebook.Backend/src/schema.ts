import { buildSchema } from 'type-graphql';
import { BuildingResolver } from './entity/building/building.resolver';
import { PersonResolver } from './entity/person/person.resolver';
import { RoomResolver } from './entity/room/room.resolver';

export const createSchema = () =>
  buildSchema({
    resolvers: [PersonResolver, RoomResolver, BuildingResolver],
    emitSchemaFile: true
  });
