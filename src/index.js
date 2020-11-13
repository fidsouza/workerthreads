'use strict';
exports.__esModule = true;
var worker_threads_1 = require("worker_threads");
var min = 2;
var max = 1e7;
var hrstart = process.hrtime();
var primes = [];
var finishedWorkers = 0;
function generatePrimes(start, range) {
    var hrend = process.hrtime(hrstart);
    var isPrime = true;
    var end = start + range;
    for (var i = start; i < end; i++) {
        for (var j = min; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
    console.info('Execution Time: %ds %dms', hrend[0], hrend[1] / 1000000);
}
if (worker_threads_1.isMainThread) {
    var threadCount = +process.argv[3] || 2;
    var threads_1 = new Set();
    ;
    console.log("Running with " + threadCount + " threads...");
    var range = Math.ceil((max - min) / threadCount);
    var start = min;
    for (var i = 0; i < threadCount - 1; i++) {
        var myStart = start;
        threads_1.add(new worker_threads_1.Worker(__filename, { workerData: { start: myStart, range: range } }));
        start += range;
    }
    threads_1.add(new worker_threads_1.Worker(__filename, { workerData: { start: start, range: range + ((max - min + 1) % threadCount) } }));
    var _loop_1 = function (worker) {
        var worker_1 = new worker_threads_1.Worker(__filename);
        worker_1.once('message', function (message) {
            primes.push(message);
            finishedWorkers++;
            if (finishedWorkers === primes.length)
                console.log('Finish');
        });
        worker_1.on('error', function (err) { throw err; });
        worker_1.on('exit', function () {
            threads_1["delete"](worker_1);
            console.log("Thread exiting, " + threads_1.size + " running...");
            if (threads_1.size === 0) {
                console.log(primes.join('\n'));
            }
        });
        worker_1.on('message', function (msg) {
            primes = primes.concat(msg);
        });
    };
    for (var _i = 0, primes_1 = primes; _i < primes_1.length; _i++) {
        var worker = primes_1[_i];
        _loop_1(worker);
    }
}
else {
    generatePrimes(worker_threads_1.workerData.start, worker_threads_1.workerData.range);
    if (worker_threads_1.parentPort != null) {
        worker_threads_1.parentPort.postMessage(primes);
    }
}
