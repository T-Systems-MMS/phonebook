const https = require('https');
const { writeFileSync } = require('fs');

/**
 * Retrieves the changelog.md file during a release with semantic release
 * Usage:
 * node getChangelog.js <version-string>
 */

let lastVersion = process.argv[2];

let url = `https://github.com/T-Systems-MMS/phonebook/releases/download/v${lastVersion}/changelog.md`;

getChangelogFromUrl(url);

function getChangelogFromUrl(url) {
  https
    .get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      res.on('end', () => {
        if (res.statusCode > 300 && res.statusCode < 400) {
          console.log(`Redirected from ${url}`);
          if (res.headers.location) {
            getChangelogFromUrl(res.headers.location);
          } else {
            throw new Error(`Could not parse redirect url.`);
          }
        } else if (res.statusCode === 200) {
          writeFileSync('src/changelog.md', data, { encoding: 'utf-8' });
          console.log(`Fetched Changelog from: ${url}`);
        } else {
          throw new Error(
            `File in remote location does not seem to exist. Error Code: ${res.statusCode} ${res.statusMessage} (${url})`
          );
        }
      });
    })
    .on('error', (err) => {
      throw new Error('Failed to fetch Changelog!', err);
    });
}
