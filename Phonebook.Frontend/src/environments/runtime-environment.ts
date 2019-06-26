import { RuntimeEnvironmentInterface } from 'src/environments/EnvironmentInterfaces';

declare const ENV: RuntimeEnvironmentInterface;
export const runtimeEnvironment: RuntimeEnvironmentInterface = {
  ravenURL: ENV.ravenURL !== '${RAVEN_URL}' ? ENV.ravenURL : 'TODO',
  employeePicturesEndpoint:
    ENV.employeePicturesEndpoint !== '${EMPLOYEE_PICTURES_ENDPOINT}' ? ENV.employeePicturesEndpoint : 'https://employee-pictures.mms-at-work.de/',
  assetsEndpoint: ENV.assetsEndpoint !== '${ASSETS_ENDPOINT}' ? ENV.assetsEndpoint : 'https://phonebook.mms-at-work.de/api/assets',
  contactEmail: ENV.contactEmail !== '${CONTACT_EMAIL}' ? ENV.contactEmail : null,
  roomPlanningToolUrl: ENV.roomPlanningToolUrl !== '${ROOMPLANNINGTOOL_URL}' ? ENV.roomPlanningToolUrl : null,
  contactUrl: ENV.contactUrl !== '${CONTACT_URL}' ? ENV.contactUrl : null
};
