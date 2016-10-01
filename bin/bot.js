#!/usr/bin/env node

'use strict';

const Bot = require('../lib/slack-strategy-bot');
const StrategyHandler = require('../lib/strategy-handler');
const strategies = require('../lib/strategies');

const token = process.env.BOT_API_KEY;
const assert = require('assert', "'BOT_API_KEY' environment variable required.");

const name = process.env.BOT_NAME || 'SlackStrategyBot';

const settings = {
  token: token,
  name: name
};

const strategyHandler = new StrategyHandler(strategies);
const bot = new Bot(settings, strategyHandler);

bot.run();