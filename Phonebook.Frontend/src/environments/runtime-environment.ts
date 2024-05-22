/* tslint:disable:no-invalid-template-strings */
import { Environment, RuntimeEnvironmentInterface } from 'src/environments/EnvironmentInterfaces';

declare const ENV: RuntimeEnvironmentInterface;
export const runtimeEnvironment: RuntimeEnvironmentInterface = {
  environment:
    ENV.environment.toString() !== '${ENVIRONMENT}' ? ENV.environment : Environment.development,
  environmentTag: ENV.environmentTag !== '${ENVIRONMENT_TAG}' ? ENV.environmentTag : '',
  ravenURL: ENV.ravenURL !== '${RAVEN_URL}' ? ENV.ravenURL : undefined,
  employeePicturesEndpoint:
    ENV.employeePicturesEndpoint !== '${EMPLOYEE_PICTURES_ENDPOINT}'
      ? ENV.employeePicturesEndpoint
      : undefined,
  assetsEndpoint:
    ENV.assetsEndpoint !== '${ASSETS_ENDPOINT}' ? ENV.assetsEndpoint : '/external_assets',
  contactEmail: ENV.contactEmail !== '${CONTACT_EMAIL}' ? ENV.contactEmail : undefined,
  roomPlanningToolUrl:
    ENV.roomPlanningToolUrl !== '${ROOMPLANNINGTOOL_URL}' ? ENV.roomPlanningToolUrl : undefined,
  contactUrl: ENV.contactUrl !== '${CONTACT_URL}' ? ENV.contactUrl : undefined,
  rocketChatUrl: ENV.rocketChatUrl !== '${ROCKETCHAT_URL}' ? ENV.rocketChatUrl : undefined,
  organizationName: ENV.organizationName !== '${ORGANIZATION_NAME}' ? ENV.organizationName : '',
};
