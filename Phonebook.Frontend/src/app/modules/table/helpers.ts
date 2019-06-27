import { PhonebookSortDirection } from 'src/app/shared/models/enumerables/PhonebookSortDirection';

/**
 * Helper Function
 */
export class Helpers {
  /**
   * This RegEx tests if a string conatains any characters that need localeCompare(),
   * for example 'ä', 'ö', or 'ü' in order to get properly compared.
   */
  private static readonly NO_LOCALE_TEST: RegExp = new RegExp('^[\\w-.\\s]*$');

  /**
   * Faster String Compare Function
   * @param a
   * @param b
   * @param direction
   */
  public static stringCompare(a: string, b: string): number {
    if (a == null) {
      if (b == null) {
        return 0;
      } else {
        return 1;
      }
    }
    if (b == null) {
      return -1;
    }
    a = a.toLowerCase();
    b = b.toLowerCase();
    // Test if the Strings contain locale characters
    if (Helpers.NO_LOCALE_TEST.test(a) && Helpers.NO_LOCALE_TEST.test(b)) {
      // If they do not contain locale characters use operator compare,
      // because it is much faster: https://jsperf.com/operator-vs-localecompage/
      return a > b ? 1 : a === b ? 0 : -1;
    } else {
      // If they do conatin locale characters use locale Compare
      try {
        return a.localeCompare(b, 'de');
      } catch (e) {
        return a.localeCompare(b);
      }
    }
  }

  public static phoneNumberCompare(aString: string, bString: string): number {
    if (aString == null) {
      if (bString == null) {
        return 0;
      } else {
        return 1;
      }
    }
    if (bString == null) {
      return -1;
    }
    const a = Helpers.stripNonNumericalCharacters(aString);
    const b = Helpers.stripNonNumericalCharacters(bString);
    if (a === '' && b === '') {
      return 0;
    }
    if (a === '') {
      return 1;
    }
    if (b === '') {
      return -1;
    }
    return Number(a) - Number(b);
  }

  public static stringArrayCompare(a: string[], b: string[], direction: PhonebookSortDirection): number {
    return Helpers.stringCompare(a.toString(), b.toString()) * Helpers.sortDirection(direction);
  }

  public static sortDirection(direction: PhonebookSortDirection): number {
    return direction === PhonebookSortDirection.asc ? 1 : -1;
  }

  /**
   * Strips every non numerical Character from the string and converts the resulting string to a number, e.g. 1.0.4 => 104
   * @param numberString Malformatted Number as String, e.g. "1.0.4" or "434 343"
   */
  public static malformattedNumberToNumber(numberString: string): number {
    return Number(Helpers.stripNonNumericalCharacters(numberString));
  }

  public static stripNonNumericalCharacters(string: string): string {
    return string.replace(new RegExp('\\D', 'g'), '');
  }
}
