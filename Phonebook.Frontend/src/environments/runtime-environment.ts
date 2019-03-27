import { RuntimeEnvironmentInterface } from 'src/environments/EnvironmentInterfaces';

declare const ENV: RuntimeEnvironmentInterface;
export const runtimeEnvironment: RuntimeEnvironmentInterface = {
  ravenURL: ENV.ravenURL !== '${RAVEN_URL}' ? ENV.ravenURL : 'TODO',
  employeePicturesEndpoint:
    ENV.employeePicturesEndpoint !== '${EMPLOYEE_PICTURES_ENDPOINT}' ? ENV.employeePicturesEndpoint : 'TODO',
  oldEmployeePictureEndpoint:
    ENV.oldEmployeePictureEndpoint !== '${OLD_EMPLOYEE_PICTURE_ENDPOINT}' ? ENV.oldEmployeePictureEndpoint : 'TODO',
  assetsEndpoint: ENV.assetsEndpoint !== '${ASSETS_ENDPOINT}' ? ENV.assetsEndpoint : 'http://localhost:8080/api/assets',
  contactEmail: ENV.contactEmail !== '${CONTACT_EMAIL}' ? ENV.contactEmail : null,
  contactUrl: ENV.contactUrl !== '${CONTACT_URL}' ? ENV.contactUrl : null,
  roomPlanningToolUrl: ENV.roomPlanningToolUrl !== '${ROOMPLANNINGTOOL_URL}' ? ENV.roomPlanningToolUrl : null
};
