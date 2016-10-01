'use strict';

class BotStrategyBase {

  constructor(name) {
    this.name = name;
  }

  getKeys() {
    this._raise('getKey');
  }

  getUsage() {
    this._raise('getUsage');
  }

  handle(message, key) {
    return Promise.resolve(this._raise('handle'));
  }

  _raise(methodName) {
    throw new Error(`'${methodName}' method not set for ${this.class.name}`);
  }
}

module.exports = BotStrategyBase;

