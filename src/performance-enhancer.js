const crypto = require('crypto');
const cluster = require('cluster');
const os = require('os');
const { performance, PerformanceObserver } = require('perf_hooks');
const zlib = require('zlib');
const stream = require('stream');
const util = require('util');

const pipeline = util.promisify(stream.pipeline);
const numCPUs = os.cpus().length;

const memoize = (fn) => {
    const cache = {};
    return (...args) => {
        const key = crypto.createHash('sha256').update(JSON.stringify(args)).digest('hex');
        if (cache[key] !== undefined) {
            console.log('Fetching value from cache...');
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
};

if(cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const expensiveFunction = memoize((...args) => {
        // long running process here with manipulated data
    });

    const obs = new PerformanceObserver((items) => {
        console.log(items.getEntries()[0]);
        performance.clearMarks();
    });

    obs.observe({ entryTypes: ['measure'] });

    const enhancer = async (...params) => {
        performance.mark('Start');
        
        const compressAndStream = async (data) => {
            const gzip = zlib.createGzip();
            const source = stream.Readable.from(data);
            await pipeline(source, gzip, process.stdout);
        };
        
        const result = await expensiveFunction(...params);
        performance.mark('End');
        performance.measure('My Special Benchmark', 'Start', 'End');

        await compressAndStream(result);
        return result;
    };

    console.log(`Worker ${process.pid} started`);
    console.log('Result:', enhancer('...some input parameters for expensive function'));
}

module.exports = { enhancer };