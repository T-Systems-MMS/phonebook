/**
 * Some helper methods to do a clean login
 */
export class LoginHelper {
  /**
   * The key for the cookie that stores the window.location before the login redirect to the Identity Provider.
   */
  private static LocationCookieKey = 'AppLocation';

  /**
   * The key for the cookie that stores a date how long the login is valid
   * Important: If you want change the key please change it also in the login backend!
   */
  private static LoginValidToCookieKey = 'LoginValidTo';
  /**
   * Ensure that the app is redirected to the login if it's needed.
   * It also cares about the apps location. So after signing the user end in on the same page.
   * It do nothing if the user is already signed in.
   */
  public static EnsureRedirectToLogin(): void {
    if (!LoginHelper.IsLoginValid()) {
      // Todo: maybe we can check here if any form contains unsaved data...
      LoginHelper.SaveCurrentLocation();
      window.location.replace('/Login');
    }
  }
  /**
   * Ensure that the app redirect it self to the last known location.
   * This is very helpful if you come back from the identity provider.
   */
  public static EnsureNavigationToStoredLocation(): void {
    let targetLocation = LoginHelper.GetStoredLocation();
    if (targetLocation != null) {
      LoginHelper.DeleteStoredLocation();
      window.location.replace(targetLocation);
    }
  }
  /**
   * Save the current window.location in a cookie. So you can later access it with {@link LoginHelper.GetStoredLocation}.
   */
  public static SaveCurrentLocation(): void {
    document.cookie = LoginHelper.LocationCookieKey + '=' + window.location;
  }
  /**
   * Get a stored location, that was saved with {@link LoginHelper.SaveCurrentLocation}.
   * @returns {(string | null)} The URL of the saved location.
   */
  public static GetStoredLocation(): string | null {
    let locationCookie = LoginHelper.readCookie().find(d => d.key === LoginHelper.LocationCookieKey);
    if (locationCookie === undefined) {
      return null;
    }
    return locationCookie.value;
  }
  /**
   * Cleanup the saved location.
   * Do this always before you redirect ot the stored location. This will avoid redirection loops.
   */
  public static DeleteStoredLocation(): void {
    document.cookie = `${LoginHelper.LocationCookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }

  /**
   * Return true if the login is in theory valid.
   * This only checks if a cookie exists and if the timestamp of the value is in the feature.
   * This is only to avoid requests run in errors. If the backend block the user this method will it never knows!
   */
  private static IsLoginValid(): boolean {
    let validLoginValue = LoginHelper.readCookie().find(d => d.key === LoginHelper.LoginValidToCookieKey);
    return validLoginValue != undefined && new Date(validLoginValue.value) > new Date();
  }
  /**
   * Read all visible cookies.
   *
   * @returns {({key:string, value:string}[])} A array with the key value pair of all cookies
   *
   * Important: We can't read cookies with the `http-only` flag!
   */
  private static readCookie(): { key: string; value: string }[] {
    return decodeURIComponent(document.cookie)
      .split('; ')
      .map(d => {
        var keyAndValue = d.split('=');
        // in case the value has the character '=' in it
        var value = keyAndValue
          .map((v, k) => {
            if (k == 0) {
              return '';
            }
            if (k == 1) {
              return v;
            }
            return '=' + v;
          })
          .join('');
        return {
          key: keyAndValue[0],
          value: value
        };
      });
  }
}
