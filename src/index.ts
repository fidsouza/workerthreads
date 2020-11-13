'use strict'

import { Worker ,isMainThread,parentPort ,workerData} from 'worker_threads'

const min = 2
const max = 1e7
const hrstart = process.hrtime()

let primes:number[] = []
let finishedWorkers = 0



function generatePrimes(start:number, range:number) {

    const hrend = process.hrtime(hrstart)

    let isPrime = true;
    let end = start + range;
    for (let i = start; i < end; i++) {
      for (let j = min; j < Math.sqrt(end); j++) {
        if (i !== j && i%j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        primes.push(i);
      }
      isPrime = true;
    }

    console.info('Execution Time: %ds %dms', hrend[0], hrend[1] / 1000000)


  }



  if (isMainThread) {
    const threadCount = +process.argv[3] || 2

    const threads = new Set();;

    console.log(`Executando com ${threadCount} threads...`);

    const range = Math.ceil((max - min) / threadCount);

    let start = min;

    for (let i = 0; i < threadCount - 1; i++) {
      const myStart = start;
      threads.add(new Worker(__filename, { workerData: { start: myStart, range }}));
      start += range;
    }

    threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadCount)}}));
    for (let worker of primes) {
      
      const worker = new Worker(__filename)
      worker.once('message', (message:number) => {
        primes.push(message)
        finishedWorkers++
        if (finishedWorkers === primes.length) 
         console.log('Finish')
      })
      worker.on('error', (err) => { throw err; });
      worker.on('exit', () => {
        threads.delete(worker);
        console.log(`Thread exiting, ${threads.size} running...`);
        if (threads.size === 0) {
          console.log(primes.join('\n'));
        }
      })
      worker.on('message', (msg) => {
        primes = primes.concat(msg);
      });
    }
  
  } else {
    generatePrimes(workerData.start, workerData.range)
    if(parentPort != null){
      parentPort.postMessage(primes)
    }

    
  }



