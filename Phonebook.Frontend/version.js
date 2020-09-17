/**
 * Writes the version.ts file during a release with semantic release
 * Usage:
 * node version.js <version-string> <short-hash> <long-hash>
 */

const { resolve, relative } = require('path');
const { writeFileSync } = require('fs');

version = process.argv[2];
hash_short = process.argv[3];
hash_long = process.argv[4];

const file = resolve(__dirname, 'src', 'environments', 'version.ts');
writeFileSync(
  file,
  `/**
* IMPORTANT: THIS FILE IS AUTO GENERATED!
* Changes wont take effect in any release.
* This are just dummy values for use in development.
*/
export const VERSION = '${version}';
export const HASH_SHORT = '${hash_short}';
export const HASH_LONG = '${hash_long}';
`,
  { encoding: 'utf-8' }
);

console.log(
  `Wrote version info ${version} with hash ${hash_short} to ${relative(
    resolve(__dirname, '..'),
    file
  )}`
);
