export interface EnvironmentInterface {
  /**
   * Determines if this is a production build or not.
   * Should only be used as a last resort for AoT-Compilation errors.
   */
  production: boolean;
  /**
   * Switch for activating Angular Route Tracing
   */
  routeTracing: boolean;
  /**
   * The MigrationLevel of the Application
   */
  migrationLevel: number | undefined;
}

export interface RuntimeEnvironmentInterface {
  /**
   * The Environment Tag is displayed right next to the title of the page, e.g. "preview", "dev"
   */
  readonly environmentTag: string;
  /**
   * The Environment the app is living in, by default it is development
   */
  readonly environment: Environment;
  /**
   * The URL to the Raven Instance, in order to report Bugs.
   * If undefined Raven does not get activated.
   */
  readonly ravenURL?: string;
  /**
   * Get the URL of the employee Pictures endpoint without a ending '/'
   * If undefined the Id will be displayed.
   */
  readonly employeePicturesEndpoint?: string;
  /*'
   * Get the URL of the assets endpoint without an ending '/'
   */
  readonly assetsEndpoint: string;
  /**
   * Your Companies Contact Email, that users can use to ask questions about the Phonebook.
   */
  readonly contactEmail?: string;
  /**
   * Your Companies Contact Url, that users will submit Bugs, Features or Feedback to.
   * Supposedly a contact Form, like ours: https://github.com/T-Systems-MMS/phonebook/issues/new
   */
  readonly contactUrl?: string;
  /**
   * Your Companies Room Planning Tool Url, that users can use to book rooms for meetings etc.
   **/
  readonly roomPlanningToolUrl?: string;
  /**
   * The Base Url of the RocketChat Messenger
   */
  readonly rocketChatUrl?: string;
}

export enum Environment {
  /**
   * Local or pr-preview environment - unstable.
   */
  development = 'development',
  /**
   * An Environment that might have Bugs and has Preview Features enabled by default
   * e.g. Early adopters or Staging Environment
   */
  preview = 'preview',
  /**
   * An Environment that is stable.
   * Preview features can be enabled by the user himself.
   */
  production = 'production'
}
