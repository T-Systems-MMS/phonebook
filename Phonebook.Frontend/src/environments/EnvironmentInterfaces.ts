export interface EnvironmentInterface {
  /**
   * Switch for defining the current Environment
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
   * The URL to the Raven Instance, in order to report Bugs
   */
  ravenURL: string;
  /**
   * Get the URL of the employee Pictures endpoint without a ending '/'
   */
  readonly employeePicturesEndpoint: string;
  /*'
   * Get the URL of the assets endpoint without an ending '/'
   */
  readonly assetsEndpoint: string;
  /**
   * Your Companies Contact Email, that users can use to ask questions about the Phonebook.
   */
  contactEmail: string | null;
  /**
   * Your Companies Contact Url, that users will submit Bugs, Features or Feedback to.
   * Supposedly a contact Form, like ours: https://github.com/T-Systems-MMS/phonebook/issues/new
   */
  contactUrl: string | null;
  /**
   * Your Companies Room Planning Tool Url, that users can use to book rooms for meetings etc.
   **/
  roomPlanningToolUrl: string | null;
}
