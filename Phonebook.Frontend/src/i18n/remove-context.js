/* this build script removes <context-group> elements from messages.xlf
 * because they are not helpful for translations but lead to merge conflicts */

const fs = require('fs');
const file = process.argv[2];

if (file == null) {
  errorHandler('no file provided');
}

fs.readFile(file, { encoding: 'utf8' }, function(err, contents) {
  if (err != null) {
    errorHandler(err);
  }
  const contentWithoutContext = contents.replace(/<context-group[\s\S]*?<\/context-group>/gm, '');
  const contentWithoutDoubleNewline = contentWithoutContext.replace(/\n\s*\n/g, '\n');
  fs.writeFile(file, contentWithoutDoubleNewline, { encoding: 'utf8' }, function(err) {
    if (err != null) {
      errorHandler(err);
    }
  });
});

function errorHandler(err) {
  console.error(err);
  process.exit(1);
}
