'use strict';

const path = require('path');
const fs = require('fs');
const BotStrategyBase = require('./bot-strategy-base');

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
    }).reduce((results, f) => {
      const file = require(path.join(this.path, f));
      if (file.prototype instanceof BotStrategyBase) {
        results.push(new file());
      }

      return results;
    }, []);
  }
}

module.exports = StrategyFactory;
