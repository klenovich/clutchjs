const fs = require('fs');
const { Transform } = require('stream');

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

const readStream = fs.createReadStream('./largeData.txt');
const writeStream = fs.createWriteStream('./outputData.txt');

readStream.pipe(transformStream).pipe(writeStream);

// Respond once the operation completes
writeStream.on('finish', () => process.stdout.write('Data Transformed!
'));

module.exports = transformStream;