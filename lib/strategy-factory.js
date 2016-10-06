'use strict';

const path = require('path');
const fs = require('fs');

class StrategyFactory {
  constructor(pathToStrategies) {
    if(pathToStrategies) {
      this.path = pathToStrategies;
    } else {
      this.path = path.resolve(__dirname,'../../../lib/strategies');
    }
  }

  resolveInstances() {
    return fs.readdirSync(this.path).filter(f => {
      return f.indexOf('.js') !== -1;
    }).map(f => {
      const file = require(path.join(this.path, f));
      return new file();
    });
  }
}

module.exports = StrategyFactory;
