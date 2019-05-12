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

// options is optional
const hash = hashFiles(['../package.json', '../package-lock.json', '../dev.Dockerfile']);

console.log(`##vso[task.setvariable variable=imageTag;isOutput=true]${hash}`);
const req = https.get(
  {
    hostname: 'hub.docker.com',
    port: 443,
    path: `/v2/repositories/danielhabenicht/test/tags/${hash}/`,
    method: 'GET'
  },
  res => {
    console.log(res.statusCode);

    if (res.statusCode === 404) {
      console.log(`##vso[task.setvariable variable=changes;isOutput=true]true`);
    } else if (res.statusCode === 200) {
      console.log(`##vso[task.setvariable variable=changes;isOutput=true]false`);
    }
  }
);

req.on('error', error => {
  console.error(error);
});
req.end();
