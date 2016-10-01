'use strict';

const BotStrategyBase = require('../bot-strategy-base');

class ExampleStrategy extends BotStrategyBase {
  constructor() {
    super('Example');
  }

  getKeys() {
    return ['example-key'];
  }

  getUsage() {
    return this.getKeys().map(key => {
      return `${key} \`{some-random-extra-parameter}\``;
    });
  }

  canHandle(message) {
    return this.getKey(message) != null;
  }

  getKey(message) {
    return this.getKeys().find( key => { return message.text.indexOf(key) != -1 }) || null;
  }

  handle(message) {
    return Promise.resolve(`This is an answer from example with original message: \`${message.text}\``);
  }
}

module.exports = ExampleStrategy;