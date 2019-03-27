import { Helpers } from './helpers';
import { PhonebookSortDirection } from 'src/app/shared/models';
import { VersionIncrement } from 'src/app/shared/models/enumerables/VersionIncrement';

// FYI: How Compare Functions Work:
// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// compareFunction(a, b)
// Return x < 0 if a should be before b
// Return x > 0 if b should be before a
// Return 0 if a and b are the same

describe('Helpers - stringCompare()', () => {
  // Alphabetical

  it('"A" before "Z"', () => {
    expect(Helpers.stringCompare('A', 'Z')).toBeLessThan(0);
    expect(Helpers.stringCompare('Z', 'A')).toBeGreaterThan(0);
  });

  it('"a" after z"', () => {
    expect(Helpers.stringCompare('a', 'z')).toBeLessThan(0);
    expect(Helpers.stringCompare('z', 'a')).toBeGreaterThan(0);
  });

  it('"A" before "z"', () => {
    expect(Helpers.stringCompare('A', 'z')).toBeLessThan(0);
    expect(Helpers.stringCompare('z', 'A')).toBeGreaterThan(0);
  });

  it('"v" before "Z"', () => {
    expect(Helpers.stringCompare('v', 'Z')).toBeLessThan(0);
    expect(Helpers.stringCompare('Z', 'v')).toBeGreaterThan(0);
  });

  it('"abcdefghijklmnopqrstuvwxy" before "abcdefghijklmnopqrstuvwxyz"', () => {
    expect(Helpers.stringCompare('abcdefghijklmnopqrstuvwxy', 'abcdefghijklmnopqrstuvwxyz')).toBeLessThan(0);
    expect(Helpers.stringCompare('abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxy')).toBeGreaterThan(0);
  });

  it('"abcdefghijklmnopqrstuvwxy" before "ABCDEFGHIJKLMNOPQRSTUVWXYZ"', () => {
    expect(Helpers.stringCompare('abcdefghijklmnopqrstuvwxy', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBeLessThan(0);
    expect(Helpers.stringCompare('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxy')).toBeGreaterThan(0);
  });

  it('"ä" before "a"', () => {
    expect(Helpers.stringCompare('a', 'ä')).toBeLessThan(0);
    expect(Helpers.stringCompare('ä', 'a')).toBeGreaterThan(0);
  });

  it('"" before "a"', () => {
    expect(Helpers.stringCompare('', 'a')).toBeLessThan(0);
    expect(Helpers.stringCompare('a', '')).toBeGreaterThan(0);
  });

  // Numbers

  it('"1" before "2"', () => {
    expect(Helpers.stringCompare('1', '2')).toBeLessThan(0);
    expect(Helpers.stringCompare('2', '1')).toBeGreaterThan(0);
  });

  it('"1" before "10"', () => {
    expect(Helpers.stringCompare('1', '10')).toBeLessThan(0);
    expect(Helpers.stringCompare('10', '1')).toBeGreaterThan(0);
  });

  // Sameness

  it('"" same as ""', () => {
    expect(Helpers.stringCompare('', '')).toEqual(0);
  });

  it('"a" same as "a"', () => {
    expect(Helpers.stringCompare('a', 'a')).toEqual(0);
  });

  it('"x" same as "x"', () => {
    expect(Helpers.stringCompare('x', 'x')).toEqual(0);
  });

  it('"1" same as "1"', () => {
    expect(Helpers.stringCompare('1', '1')).toEqual(0);
  });

  // Null
  it('"1" before null', () => {
    expect(Helpers.stringCompare('1', null)).toBeLessThan(0);
    expect(Helpers.stringCompare(null, '1')).toBeGreaterThan(0);
  });

  it('null same as null ', () => {
    expect(Helpers.stringCompare(null, null)).toEqual(0);
    expect(Helpers.stringCompare(null, null)).toEqual(0);
  });

  it('"" before null', () => {
    expect(Helpers.stringCompare('', null)).toBeLessThan(0);
    expect(Helpers.stringCompare(null, '')).toBeGreaterThan(0);
  });
});

describe('Helpers - phoneNumberCompare()', () => {
  // Normal (Unformatted)

  it('"+4900000001" before "+4900000002"', () => {
    expect(Helpers.phoneNumberCompare('+4900000001', '+4900000002')).toBeLessThan(0);
    expect(Helpers.phoneNumberCompare('+4900000002', '+4900000001')).toBeGreaterThan(0);
  });

  // Formatted
  it('"+49 0000 0001" before "+49 0000 0002"', () => {
    expect(Helpers.phoneNumberCompare('+49 0000 0001', '+49 0000 0002')).toBeLessThan(0);
    expect(Helpers.phoneNumberCompare('+49 0000 0002', '+49 0000 0001')).toBeGreaterThan(0);
  });

  // Null
  it('"+4900000002" before null', () => {
    expect(Helpers.phoneNumberCompare('+4900000002', null)).toBeLessThan(0);
    expect(Helpers.phoneNumberCompare(null, '+4900000002')).toBeGreaterThan(0);
  });

  it('null same as null', () => {
    expect(Helpers.phoneNumberCompare(null, null)).toEqual(0);
    expect(Helpers.phoneNumberCompare(null, null)).toEqual(0);
  });

  // Malformatted Content
  it('"x" same as "y"', () => {
    expect(Helpers.phoneNumberCompare('x', 'y')).toEqual(0);
    expect(Helpers.phoneNumberCompare('y', 'x')).toEqual(0);
  });
});

describe('Helpers - malformattedNumberToNumber()', () => {
  it('should format "1.0.2" to 102', () => {
    expect(Helpers.malformattedNumberToNumber('1.0.2')).toEqual(102);
  });
  it('should format "34343 3434 4378" to 3434334344378', () => {
    expect(Helpers.malformattedNumberToNumber('34343 3434 4378')).toEqual(3434334344378);
  });
});

describe('Helpers - stripNonNumericalCharacters()', () => {
  it('should strip all non Numericals', () => {
    expect(
      Helpers.stripNonNumericalCharacters('ab1cdef2ghijk3lmn4opqrst5uv6w7xyz8!"§%9&/()=?\\*+~#-.0,;:_><|`´')
    ).toEqual('1234567890');
  });
});
