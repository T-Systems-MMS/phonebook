import * as faker from 'faker';
import { Person } from 'src/entity/person/person.entity';
export function generatePerson(): Partial<Person> {
  let id = faker.random.alphaNumeric(4).toUpperCase();

  return {
    type: faker.random.arrayElement(['Externer_Lernender', 'Fremdkraft', 'Interner_Lernender', 'Interner_Mitarbeiter']),
    id: id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    title: faker.random.arrayElement(['Dr.', '', '', 'Prof.']),
    role: faker.name.jobTitle(),
    picture: {
      exists: faker.random.boolean(),
      resourceUrl: faker.internet.url()
    },
    contactInformation: {
      mobile: faker.phone.phoneNumberFormat(0),
      fax: faker.phone.phoneNumberFormat(1),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(2)
    },
    room: {
      id: faker.random.uuid(),
      number: `${faker.random.number(200)}a`,
      roomPlanUrl: faker.internet.url()
    },
    organizationUnits: ['Org Unit'],
    costCenter: `${faker.random.number(9999)}`
  };
}
