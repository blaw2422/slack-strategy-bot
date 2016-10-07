'use strict';

class BotStrategyBase {

  constructor(name) {
    this.name = name;
  }

  getKeys() {
    this._raise('getKeys');
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

  canHandle(message) {
    return this.getKey(message) != null;
  }

  getKey(message) {
    return this.getKeys().find( key => { return message.text.indexOf(key) !== -1 }) || null;
  }

}

module.exports = BotStrategyBase;

