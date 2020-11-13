'use strict';
var min = 2;
var max = 1e7;
var hrstart = process.hrtime();
var start = new Date();
var primes = [];
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
generatePrimes(min, max);
