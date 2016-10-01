# Slack Strategy Bot

> Helping organize code for slackbots to quickly add functionality

The idea with this codebase is to provide a small framework for adding "strategies" to a slackbot.  Think of a strategy like a question, answer pair.  Each strategy is a combination of a **key**, **answer**, and **usage**.  

Hopefully, with this framework, you will only have to code new **strategies** instead of worrying about running a slackbot.

### Key
The key is how a user tells the slackbot which question in which to give an answer

### Answer
The answer is the message slackbot responds with.  There is a method that returns the string to be displayed called `handle` which should be implemented to return a Promise that resolves a string.

### Usage
The usage method helps to tell the users of the slackbot how to format their questions.

```
@slackbot-name {key goes here} [{any} {number} {of} {parameters} {goes} {here}]
```

## Implementing a new strategy
The idea is that one creates a class that implements the `BotStrategyBase` class, and include the strategy when creating the bot.  Everything else should just work.  There is an example in the *strategies* directory.

## Running the bot
This project uses `slackbots` npm package to run a slackbot.  The `npm start` script calls the following example file to start the bot.

```
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
```

## TODO
The idea is to turn this into an NPM package that can be added to a project.  The goal would be for the consumers to only add strategy classes and execute the included `npm start` script
