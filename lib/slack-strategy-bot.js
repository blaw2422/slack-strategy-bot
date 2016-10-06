'use strict';

const BaseBot = require('slackbots');
const logger = require('./logger');
const StrategyFactory = require('./strategy-factory');
const StrategyHandler = require('./strategy-handler');

class SlackStrategyBot extends BaseBot {

  constructor(settings, strategyDir) {
    const strategies = new StrategyFactory(strategyDir).resolveInstances();

    settings.name = settings.name || 'SlackStrategyBot';
    super(settings);

    this.strategyHandler = new StrategyHandler(strategies);
    this.logger = logger;
  }

  run() {
    this.on('start', this._onStart);
    setTimeout(() => { this.on('message', this._onMessage) }, 1000);
  }

  _onStart() {
    this._loadBotUser(user => { this.strategyHandler.setUser(user); });
  }

  _onMessage(message) {
    if (this._isChatMessage(message) && this._mentionsBot(message) && this._isChannelConversation(message) && !this._isFromBot(message)) {
      this.logger.debug('Handling message');
      this._handleMessage(message);
    }
  }

  _handleMessage(originalMessage) {
    this.logger.debug(originalMessage);
    this.strategyHandler.getAnswer(originalMessage).then(message => {
      if (originalMessage.isGroup) {
        const group = this._getGroupById(originalMessage.channel);
        if (group) {
          this.logger.debug('writing to group', message);
          this.postMessageToGroup(group.name, message);
        }
      } else if (originalMessage.isChannel) {
        const channel = this._getChannelById(originalMessage.channel);
        if (channel) {
          this.logger.debug('writing to channel', message);
          this.postMessageToChannel(channel.name, message);
        }
      }
    });
  }

  _loadBotUser(callback) {
    const user = this.users.filter((user) => {
      return user.name === this.name;
    });

    if (user.length) {
      this.user = user[0];
      this.logger.debug(`User is ${JSON.stringify(this.user)}`);
      callback(this.user);
    } else {
      this.logger.warn(`Bot User not found with name '${this.name}'`);
    }
  }

  _isChatMessage(message) {
    const val = message.type === 'message' && Boolean(message.text);
    this.logger.debug(`[_isChatMessage] ${val}`);
    return val;
  };

  _mentionsBot(message) {
    const val = message.text.indexOf(this.user.id) != -1;
    this.logger.debug(`[_mentionsBot] ${val}`);
    return val;
  }

  _isChannelConversation(message) {
    message.isChannel = message.channel[0] === 'C';
    message.isGroup = message.channel[0] === 'G';
    const val = message.isChannel || message.isGroup;
    this.logger.debug(`[_isChannelConversation] ${val}`);
    return val;
  };

  _isFromBot(message) {
    const val = message.username === this.user.name;
    this.logger.debug(`[_isFromBot] ${val}`);
    return val;
  };

  _getChannelById(channelId) {
    return this._filterBy(channelId, this.channels);
  }

  _getGroupById(groupId) {
    return this._filterById(groupId, this.groups);
  }

  _filterById(id, list) {
    const filtered = list.filter(function(item) {
      return item.id === id;
    });

    return filtered.length ? filtered[0] : null;
  }

}

module.exports = SlackStrategyBot;
