// Generate Json Mock data with this script
let faker = require('faker');
let fs = require('fs');

faker.seed(111111111111111111);

function generateArray(length, functionToExecute, args = null) {
  let arr = new Array();
  for (let i = 0; i < length; i++) {
    if (args) {
      arr.push(functionToExecute(args));
    } else {
      arr.push(functionToExecute());
    }
  }

  return arr;
}

// Generate Rooms
let cityCount = 15;

let addresses = generateArray(cityCount * 2, faker.address.streetAddress);
let roomNumbers = ['1A', '2A', '3A', '4A', '5A', '6A', '1B', '2B', '3B', '4B', '5B', '6B'];
let cities = generateArray(cityCount, faker.address.city);

function generateRoom() {
  let city = faker.random.arrayElement(cities);

  return {
    Building: faker.random.arrayElement(addresses),
    BuildingId: faker.random.number(100),
    Description: `${city}, ${faker.random.arrayElement(
      addresses
    )}, Raum ${faker.random.arrayElement(roomNumbers)}`,
    Floor: `${faker.random.number(6)}`,
    FloorPlan: faker.random.arrayElement(['sample_highlight', 'sample_static']),
    Id: faker.random.arrayElement(roomNumbers),
    Number: `${faker.random.arrayElement(roomNumbers)}`,
    Phone: '',
    Place: city,
  };
}

let rooms = generateArray(200, generateRoom);

// Generate Persons

let shortOrgUnits = generateArray(50, faker.random.alphaNumeric, 6);
let shortOrgUnits1 = shortOrgUnits.slice(0, 5);
let shortOrgUnits2 = shortOrgUnits.slice(6, 30);
let shortOrgUnits3 = shortOrgUnits.slice(31, 50);
let longOrgUnits = generateArray(50, faker.commerce.department);
let longOrgUnits1 = longOrgUnits.slice(0, 5);
let longOrgUnits2 = longOrgUnits.slice(6, 30);
let longOrgUnits3 = longOrgUnits.slice(31, 50);

let jobTitles = generateArray(150, faker.name.jobTitle);

let ids = new Array();

// Persons
function generatePerson() {
  let id = faker.random.alphaNumeric(4).toUpperCase();
  let room = faker.random.arrayElement(rooms);
  ids.push(id);

  return {
    Type: faker.random.arrayElement([
      'Externer_Lernender',
      'Fremdkraft',
      'Interner_Lernender',
      'Interner_Mitarbeiter',
    ]),
    Id: id,
    Firstname: faker.name.firstName(),
    Surname: faker.name.lastName(),
    Title: faker.random.arrayElement(['Dr.', '', '', 'Prof.']),
    Role: faker.random.arrayElement(jobTitles),
    Picture: faker.random.boolean(),
    Contacts: {
      Mobile: faker.phone.phoneNumberFormat(0),
      Fax: faker.phone.phoneNumberFormat(1),
      Email: faker.internet.email(),
      Phone: faker.phone.phoneNumberFormat(2),
      Messenger: { Text: '', State: 0 },
    },
    Location: {
      ContactPerson: null,
      LinkRoutingWebsite: null,
      ReceptionFax: null,
      Description: null,
      ReceptionPhone: null,
      LinkPicture: null,
      LinkRoutingInfo: null,
      City: { Name: room.Place, Building: room.Building, ZipCode: faker.address.zipCode() },
      RoomCollection: [
        {
          Building: room.Building,
          BuildingId: room.BuildingId,
          Floor: room.Floor,
          Description: room.Description,
          Phone: '',
          Number: room.Number,
          Id: room.Id,
          Place: room.Place,
          FloorPlan: room.FloorPlan,
        },
      ],
    },
    Business: {
      ShortBusinessunitTeamassistent: [faker.random.arrayElement(ids)],
      ShortSupervisor: [faker.random.arrayElement(ids)],
      ShortOrgUnit: [
        faker.random.arrayElement(shortOrgUnits1),
        faker.random.arrayElement(shortOrgUnits2),
        faker.random.arrayElement(shortOrgUnits3),
      ],
      OrgUnit: [
        faker.random.arrayElement(longOrgUnits1),
        faker.random.arrayElement(longOrgUnits2),
        faker.random.arrayElement(longOrgUnits3),
      ],
      BusinessunitTeamassistent: [`${faker.name.firstName()} ${faker.name.lastName()}`],
      Supervisor: [`${faker.name.firstName()} ${faker.name.lastName()}`],
      Costcenter: `${faker.random.number(500)}`,
    },
  };
}

let branchesCount = 0;
let city = cities[0];
function generateBranch() {
  if (branchesCount % 2 == 0) {
    city = cities.pop();
  }
  branchesCount++;

  return {
    ContactPerson: '',
    LinkRoutingWebsite: `http://maps.google.de/maps?f=q&hl=de&q=${city}`,
    ReceptionFax: faker.phone.phoneNumberFormat(2),
    Description: `Standort ${city}`,
    ReceptionPhone: faker.phone.phoneNumberFormat(1),
    LinkPicture: faker.random.arrayElement([
      '/images/sample_640.jpg',
      '/images/sample_1280.jpg',
      '/images/sample_1920.jpg',
    ]),
    LinkRoutingInfo: '/plans/description.pdf',
    City: {
      Name: city,
      Building: faker.random.arrayElement(addresses),
      ZipCode: faker.address.zipCode(),
    },
    RoomCollection: rooms.filter((r) => {
      return r.Place === city;
    }),
  };
}

fs.writeFileSync(
  './mocks/synthetic/persons.json',
  JSON.stringify(generateArray(1500, generatePerson))
);
fs.writeFileSync('./mocks/synthetic/rooms.json', JSON.stringify(rooms));
fs.writeFileSync(
  './mocks/synthetic/branches.json',
  JSON.stringify(generateArray(cityCount * 2, generateBranch))
);
