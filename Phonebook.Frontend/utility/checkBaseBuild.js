var hashFiles = require('hash-files');
var https = require('https');

// options is optional
hashFiles(
  {
    files: ['../package.json', '../package-lock.json', '../dev.Dockerfile'],
    noGlob: true
  },
  function(error, hash) {
    if (error) {
      console.error(error);
    }

    console.log(`##vso[task.setvariable variable=myOutputVar;isOutput=true]${hash}`);
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
  }
);
