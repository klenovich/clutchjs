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

module.exports = [
  {
    id: 1,
    name: "Read Image from Database",
    executionTime: 500, // in ms
    priority: 3, // 1- high, 5- low
    task: () => {

        console.log("Reading Image from Database");
        // ... Perform actual task
    },
  },
  {
    id: 2,
    name: "Apply filters to Image",
    executionTime: 2000, // in ms
    priority: 2,
    task: () => {
        console.log("Applying filters to Image");
        // ... Perform actual task
    },
  },
  {
    id: 3,
    name: "Compress Image",
    executionTime: 1000, // in ms
    priority: 1,
    task: () => {
        console.log("Compressing Image");
        // ... Perform actual task
    },
  },
  // more tasks as per your requirements
];