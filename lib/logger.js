"use strict";

var log4js = require("log4js");
var levels = require("log4js/lib/levels");

var logger = log4js.getLogger();
var envLogLevel = process.env.LOG_LEVEL;
var logLevel = levels.WARN;

if (envLogLevel) {
  logLevel = levels.toLevel(envLogLevel, logLevel);
}
logger.setLevel(logLevel);

module.exports = logger;
