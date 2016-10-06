'use strict';

const fs = require('fs');
const path = require('path');

const start = 'node --harmony bin/bot.js';

const filename = '../../../package.json';
const p = require(filename);

if (p.scripts && p.scripts.start) {
  // TODO: change to legit logger
  console.log("'start' script already setup.");
  console.log(`Add '${start}' to your scripts section to run slackbot`);
} else {
  p.scripts.start = start;
  fs.writeFile(path.resolve(__dirname, filename), JSON.stringify(p, null, 2), null, function(err) {
    if(err) {
        console.log(err);
    } else {
      console.log("npm script 'run' saved.");
    }
  });
}
