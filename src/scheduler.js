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

const priorityQueue = require('./priorityQueue');

class Scheduler {
  constructor() {
    this.queue = new PriorityQueue((a, b) => a.priority < b.priority);
  }

  scheduleTask(task, priority) {
    this.queue.push({task, priority});
  }

  get nextTask() {
    return this.queue.pop().task;
  }

  get hasTask() {
    return !this.queue.isEmpty();
  }

  start() {
    setInterval(() => {
      if (this.hasTask) {
        const task = this.nextTask;
        task();
      }
    }, 1000);
  }
}

module.exports = new Scheduler;