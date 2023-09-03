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

const request = require('supertest');
const compressAndStream = require('../src/compression');
const fastFibonacci = require('../src/index');
const fs=require('fs')

describe('Express application', () => {
  
  it('GET /status', async () => {
    const response = await request(app).get('/status');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Server is running');
  });

  it('GET /fibonacci/:num', async () => {
    const number = 10;
    const response = await request(app).get(`/fibonacci/${number}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body.result).toEqual(fastFibonacci(number));
  });
});

describe('Memoized Fibonacci', () => {
  
  it('Fibonacci of 10', () => {
    expect(fastFibonacci(10)).toEqual(55);
  });

  it('Fibonacci of 20', () => {
    expect(fastFibonacci(20)).toEqual(6765);
  });
});

describe('Data compression', () => {
  const inputFile = 'testInput.txt';
  const outputFile = 'testOutput.txt';

  beforeAll(() => {
    fs.writeFileSync(inputFile, 'Test data for compression');
  });

  afterAll(() => {
    fs.unlinkSync(inputFile);
    fs.unlinkSync(outputFile);
  });

  it('should reduce data size after compression', async () => {
    await compressAndStream(inputFile, outputFile);
    
    const { size: originalSize } = fs.statSync(inputFile);
    const { size: compressedSize } = fs.statSync(outputFile);
    
    expect(compressedSize).toBeLessThan(originalSize);
  });
});

describe('Multithreading', () => {
  
  it('should return results from all processed tasks', async () => {
    const taskResults = await runMultiThreading(someTaskFunction, [1, 2, 3]);
    expect(taskResults.length).toEqual(3);
  });
});