// Generate Json Mock data with this script
let faker = require('faker');
let fs = require('fs');

faker.seed(111111111111111111);

function generateArray(length, functionToExectute, args = null) {
  let arr = new Array();
  for (let i = 0; i < length; i++) {
    if (args) {
      arr.push(functionToExectute(args));
    } else {
      arr.push(functionToExectute());
    }
  }

  return arr;
}

let shortOrgUnits = generateArray(50, faker.random.alphaNumeric, 6);
let shortOrgUnits1 = shortOrgUnits.slice(0, 5);
let shortOrgUnits2 = shortOrgUnits.slice(6, 30);
let shortOrgUnits3 = shortOrgUnits.slice(31, 50);
let longOrgUnits = generateArray(50, faker.commerce.department);
let longOrgUnits1 = longOrgUnits.slice(0, 5);
let longOrgUnits2 = longOrgUnits.slice(6, 30);
let longOrgUnits3 = longOrgUnits.slice(31, 50);

let cities = generateArray(15, faker.address.city);

let addresses = generateArray(30, faker.address.streetAddress);

let ids = new Array();

// Persons
function generatePerson() {
  let id = faker.random.alphaNumeric(4).toUpperCase();
  ids.push(id);

  let city = faker.random.arrayElement(cities);
  return {
    Type: faker.random.arrayElement(['Externer_Lernender', 'Fremdkraft', 'Interner_Lernender', 'Interner_Mitarbeiter']),
    Id: id,
    Firstname: faker.name.firstName(),
    Surname: faker.name.lastName(),
    Title: faker.random.arrayElement(['Dr.', '', '', 'Prof.']),
    Role: faker.name.jobTitle(),
    Picture: faker.random.boolean(),
    Contacts: {
      Mobile: faker.phone.phoneNumberFormat(0),
      Fax: faker.phone.phoneNumberFormat(1),
      Email: faker.internet.email(),
      Phone: faker.phone.phoneNumberFormat(2),
      Messenger: { Text: '', State: 0 }
    },
    Location: {
      ContactPerson: null,
      LinkRoutingWebsite: null,
      ReceptionFax: null,
      Description: null,
      ReceptionPhone: null,
      LinkPicture: null,
      LinkRoutingInfo: null,
      City: { Name: city, Building: faker.random.arrayElement(addresses) },
      RoomCollection: [
        {
          Building: faker.random.arrayElement(addresses),
          BuildingId: `${faker.random.number()}`,
          Floor: faker.random.number(6),
          Description: `${city}, ${faker.random.arrayElement(addresses)}, Raum ${faker.random.number(200)}`,
          Phone: '',
          Number: `${faker.random.number(200)}`,
          Id: `${faker.random.number(200)}`,
          Place: city,
          FloorPlan: faker.random.arrayElement(['sample_highlight', 'sample_static'])
        }
      ]
    },
    Business: {
      ShortBusinessunitTeamassistent: [faker.random.arrayElement(ids)],
      ShortSupervisor: [faker.random.arrayElement(ids)],
      ShortOrgUnit: [
        faker.random.arrayElement(shortOrgUnits1),
        faker.random.arrayElement(shortOrgUnits2),
        faker.random.arrayElement(shortOrgUnits3)
      ],
      OrgUnit: [
        faker.random.arrayElement(longOrgUnits1),
        faker.random.arrayElement(longOrgUnits2),
        faker.random.arrayElement(longOrgUnits3)
      ],
      BusinessunitTeamassistent: [`${faker.name.firstName()} ${faker.name.lastName()}`],
      Supervisor: [`${faker.name.firstName()} ${faker.name.lastName()}`],
      Costcenter: `${faker.random.number(9999)}`
    }
  };
}

function generateRoom() {
  let city = faker.random.arrayElement(cities);

  return {
    Building: faker.random.arrayElement(addresses),
    BuildingId: faker.random.number(100),
    Description: `${city}, ${faker.random.arrayElement(addresses)}, Raum ${faker.random.number(200)}`,
    Floor: `${faker.random.number(6)}`,
    FloorPlan: faker.random.arrayElement(['sample_highlight', 'sample_static']),
    Id: faker.random.number(200),
    Number: `${faker.random.number(200)}`,
    Phone: '',
    Place: city
  };
}

function generateBranch() {
  let city = cities.pop();

  return {
    ContactPerson: '',
    LinkRoutingWebsite: `http://maps.google.de/maps?f=q&hl=de&q=${city}`,
    ReceptionFax: faker.phone.phoneNumberFormat(2),
    Description: `Standort ${city}`,
    ReceptionPhone: faker.phone.phoneNumberFormat(1),
    LinkPicture: faker.random.arrayElement([
      '/images/sample_640.jpg',
      '/images/sample_1280.jpg',
      '/images/sample_1920.jpg'
    ]),
    LinkRoutingInfo: '/plans/description.pdf',
    City: {
      Name: city,
      Building: faker.random.arrayElement(addresses),
      ZipCode: faker.address.zipCode()
    },
    RoomCollection: rooms.filter(r => {
      return r.Place === city;
    })
  };
}

fs.writeFileSync('./mocks/synthetic/persons.json', JSON.stringify(generateArray(1500, generatePerson)));
let rooms = generateArray(200, generateRoom);
fs.writeFileSync('./mocks/synthetic/rooms.json', JSON.stringify(rooms));
fs.writeFileSync('./mocks/synthetic/branches.json', JSON.stringify(generateArray(15, generateBranch)));
