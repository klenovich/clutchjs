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

const { performance, PerformanceObserver } = require('perf_hooks');
const logger = require('./logger');

const wrapFunction = (fn, name) => {
  const wrappedFunction = async (...args) => {
    const startMark = `${name}-start`;
    const endMark = `${name}-end`;

    performance.mark(startMark);

    const result = await fn(...args);

    performance.mark(endMark);
    performance.measure(name, startMark, endMark);

    return result;
  };

  return wrappedFunction;
};

const performanceObserver = new PerformanceObserver((list, observer) => {
  const entries = list.getEntries();

  for (const entry of entries) {
    const { name, duration } = entry;
    logger.info(`${name} took ${duration} ms`);
  }

  observer.disconnect();
});

performanceObserver.observe({ entryTypes: ['measure'], buffered: true });

module.exports = { wrapFunction };