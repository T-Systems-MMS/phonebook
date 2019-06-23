import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
export type Maybe<T> = T | null;
export type MaybePromise<T> = Promise<T> | T;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Building = {
  __typename?: "Building";
  id: Scalars["ID"];
};

export type ContactInformation = {
  __typename?: "ContactInformation";
  mobile: Scalars["String"];
  phone: Scalars["String"];
  fax: Scalars["String"];
  email: Scalars["String"];
};

export type Person = {
  __typename?: "Person";
  id: Scalars["ID"];
  type: Scalars["String"];
  title: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  role: Scalars["String"];
  picture: Picture;
  costCenter: Scalars["String"];
  room: Room;
  contactInformation: ContactInformation;
  supervisors: Array<Person>;
  teamAssistants: Array<Person>;
  organizationUnits: Array<Scalars["String"]>;
};

export type Picture = {
  __typename?: "Picture";
  exists: Scalars["Boolean"];
  resourceUrl: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  buildings: Array<Building>;
  getPersons: Array<Person>;
  getPerson: Person;
  rooms: Array<Room>;
};

export type QueryGetPersonsArgs = {
  searchString?: Maybe<Scalars["String"]>;
  filter?: Maybe<Scalars["String"]>;
};

export type QueryGetPersonArgs = {
  id: Scalars["ID"];
};

export type Room = {
  __typename?: "Room";
  id: Scalars["ID"];
  number: Scalars["String"];
  roomPlanUrl: Scalars["String"];
  occupiedByPersons: Array<Person>;
};
export type UserDetailQueryVariables = {
  id: Scalars["ID"];
};

export type UserDetailQuery = { __typename?: "Query" } & {
  getPerson: { __typename?: "Person" } & Pick<
    Person,
    "id" | "costCenter" | "firstName" | "lastName"
  >;
};

export const UserDetailDocument = gql`
  query UserDetail($id: ID!) {
    getPerson(id: $id) {
      id
      costCenter
      firstName
      lastName
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class UserDetailGQL extends Apollo.Query<
  UserDetailQuery,
  UserDetailQueryVariables
> {
  document = UserDetailDocument;
} // Generated in 2019-06-23T17:53:57+02:00
