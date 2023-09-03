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

const { isMainThread, parentPort, workerData, threadId, Worker } = require('worker_threads');

const NUM_OF_WORKERS = require('os').cpus().length;
const logger = require('./logger');

// If not a main thread, then it should be one of our workers
// Workers will execute the function passed to them with the provided data and return the result
if (!isMainThread) {
  const { functionString, data } = workerData;
  const func = eval(functionString);
  parentPort.postMessage(func(data));
}

const createWorker = (functionToRun, data) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: {
        functionString: '(' + functionToRun.toString() + ')',
        data,
      },
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error('Worker stopped with exit code ' + code));
      }
    });
  });
};

const runMultiThreading = async (func, dataList) => {
  const results = [];
  for (let i = 0; i < NUM_OF_WORKERS; i++) {
    const result = await createWorker(func, dataList[i]);
    results.push(result);
  }
  return results;
};

module.exports = { runMultiThreading };