'use strict';

class StrategyHandler {

  constructor(strategies) {
    if (strategies) {
      const isArray = strategies instanceof Array;
      if (!isArray) {
        this.strategies = [strategies];
      } else {
        this.strategies = strategies;
      }
    } else {
      throw new Error('StrategyHandler requires array of strategies in constructor');
    }
  }

  setUser(user) {
    this.user = user;
  }

  getKeys() {
    return this.strategies.map(strategy => {
      return strategy.getKeys();
    }).reduce((a,b) => { return a.concat(b)}).join("\n");
  }

  getUsages() {
    const usages = this.strategies.map(strategy => {
      return strategy.getUsage();
    }).reduce((a,b) => { return a.concat(b); })
      .map(usage => {
        return `<@${this.user.id}> ${usage}`;
      });

    return ['*The following commands are valid:*'].concat(usages).join("\n");
  }

  getAnswer(message) {
    if (message.text.replace(' ','') === `<@${this.user.id}>`) {
      return Promise.resolve(this.getUsages());
    } else {
      const match = this.strategies.find(strat => {
        return strat.canHandle(message);
      })

      if (match) {
        message.changedText = message.text.replace(`<@${this.user.id}> `,'');
        return match.handle(message);
      } else {
        return Promise.resolve('I did not understand what you meant.');
      }
    }
  }
}

module.exports = StrategyHandler;