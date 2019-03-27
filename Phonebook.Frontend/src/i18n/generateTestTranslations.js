/**
 * Replaces all translation targets with "TEST"
 * Usage:
 * node generateTestTranslations.js
 */

(fs = require('fs')), (path = require('path'));

// // Get parameters
// env = process.argv[2];
// if (!(env === 'prod' || env === 'dev')) {
//   console.log(`Please specify the environment! Either 'dev' or 'prod'.`);
//   return;
// }

const filePath = path.join(__dirname, 'messages.test.xlf');
const writeFilePath = path.join(__dirname, 'messages.test.xlf');

var fs = require('fs');
fs.readFile(filePath, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/<target state="new">((?!\{)[\s\S])*?<\/target>/g, '<target state="final">TEST</target>');

  fs.writeFile(writeFilePath, result, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});

console.log(`Generated Test Translations!`);
