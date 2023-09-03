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

const zlib = require('zlib');
const fs = require('fs');
const { pipeline } = require('stream');
const util = require('util');
const pump = util.promisify(pipeline);

async function compressAndStream(inputFile, outputFile) {
  const gzip = zlib.createGzip();
  const sourceStream = fs.createReadStream(inputFile);
  const destStream = fs.createWriteStream(outputFile);

  await pump(sourceStream, gzip, destStream);

  console.log('Successfully compressed and wrote data to output file');
}

module.exports = compressAndStream;