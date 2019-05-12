var crypto = require('crypto');
var fs = require('fs');
var https = require('https');

function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex');
}

function hashFiles(files) {
  hashes = '';
  files.forEach(path => {
    hashes += checksum(fs.readFileSync(path));
  });
  return checksum(hashes);
}

files = ['../package.json', '../package-lock.json', '../dev.Dockerfile'];

// options is optional
const hash = hashFiles(files);

console.log(`##vso[task.setvariable variable=imageTag;isOutput=true]${hash}`);
console.log(`Hash of files:`);
files.forEach(file => {
  console.log(` - ${file}`);
});
console.log(`is ${hash}`);
const req = https.get(
  {
    hostname: 'hub.docker.com',
    port: 443,
    path: `/v2/repositories/danielhabenicht/test/tags/${hash}/`,
    method: 'GET'
  },
  res => {
    console.log(`Image exists at registry? ${res.statusCode}`);

    if (res.statusCode === 404) {
      console.log(` => Building new Image`);
      console.log(`##vso[task.setvariable variable=changes;isOutput=true]true`);
    } else if (res.statusCode === 200) {
      console.log(` => No need to build a new Image`);
      console.log(`##vso[task.setvariable variable=changes;isOutput=true]false`);
    }
  }
);

req.on('error', error => {
  console.error(error);
});
req.end();
