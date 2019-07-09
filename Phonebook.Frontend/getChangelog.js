const request = require('request');
const { writeFileSync } = require('fs');

/**
 * Retrieves the changelog.md file during a release with semantic release
 * Usage:
 * node getChangelog.js <version-string>
 */

lastVersion = process.argv[2];

let url = `https://github.com/T-Systems-MMS/phonebook/releases/download/v${lastVersion}/changelog.md`;

request.get(url, (err, res, body) => {
  if (err) {
    throw new Error('Failed to fetch Changelog!', err);
  }
  if (res.statusCode === 200) {
    writeFileSync('src/changelog.md', body, { encoding: 'utf-8' });
    console.log(`Fetched Changelog from: ${url}`);
  } else {
    throw new Error(
      `File in remote location does not seem to exist. Error Code: ${res.statusCode} ${res.statusMessage} (${url})`,
      err
    );
  }
});
