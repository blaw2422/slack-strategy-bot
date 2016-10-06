# Slack Bot Dispatch

> Helping organize code for slackbots to quickly add functionality

The idea with this codebase is to provide a small framework for adding "strategies" to a slackbot.  Think of a strategy like a question, answer pair.

Hopefully, with this framework, you will only have to code new **strategies** instead of worrying about running a slackbot.

Literally, install the npm package and run `npm start`.  An example strategy will be installed as well.
> Note: there are 2 environment variables that need to be set
> * BOT_NAME
> * BOT_API_KEY

```
 $ export BOT_API_KEY=xyz
 $ export BOT_NAME=leeeroyjenkins
 $ npm install slackbot-dispatch
 $ npm start
```
> Note: log4js is used to log certain events, set **LOG_LEVEL** environment variable to change output

-------
## Strategies explained
### Key
The key is how a user tells the slackbot which question in which to give an answer

### Answer
The answer is the message slackbot responds with.  There is a method that returns the string to be displayed called `handle` which should be implemented to return a Promise that resolves a string.

### Usage
The usage method helps to tell the users of the slackbot how to format their questions.

## Implementing a new strategy
The idea is that one creates a class that implements the `BotStrategyBase` class, and include the strategy when creating the bot.  Everything else should just work.  There is an example in the *lib/strategies* directory.
> There is an example copied into the target folder on install.

[Example strategy](lib/strategies/example-strategy.js)

## Example Usage
| slackbot-name | key | param |
| --- | --- | --- |
| @slackbot-dispatcher | what time is it in  | Nashville TN |
