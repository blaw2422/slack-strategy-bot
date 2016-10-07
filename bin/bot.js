#!/usr/bin/env node

'use strict';
const path = require('path');
const assert = require('assert');

const Bot = require('slackbot-dispatch/lib/slack-strategy-bot');
const StrategyHandler = require('slackbot-dispatch/lib/strategy-handler');

const settings = {
  token: process.env.BOT_API_KEY,
  name: process.env.BOT_NAME
};

assert(settings.token, "'BOT_API_KEY' environment variable required.");
assert(settings.name, "'BOT_NAME' environment variable required.");

const bot = new Bot(settings, process.env.SLACK_STRATEGY_DIR);

bot.run();