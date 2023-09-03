/*

╋╋╋┏┓╋╋╋┏┓╋╋╋┏┓
╋╋╋┃┃╋╋┏┛┗┓╋╋┃┃╋╋┏┓
┏━━┫┃┏┓┣┓┏╋━━┫┗━┓┗╋━━┓
┃┏━┫┃┃┃┃┃┃┃┏━┫┏┓┃┏┫━━┫
┃┗━┫┗┫┗┛┃┗┫┗━┫┃┃┣┫┣━━┃
┗━━┻━┻━━┻━┻━━┻┛┗┻┫┣━━┛
╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋┏┛┃
╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋╋┗━┛

clutch.js
---
github.com/klenovich/clutchjs
---
A just-in-time automated package that increases preformance standards by a large metric.

*/

const winston = require('winston');
const config = require('./config');

const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ],
});

module.exports = logger;