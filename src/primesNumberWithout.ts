'use strict'


const min = 2
const max = 1e7
const hrstart = process.hrtime()
const start = new Date()

const primes:number[] = []

function generatePrimes(start:number, range:number) {
  
  const hrend = process.hrtime(hrstart)

  let isPrime:boolean = true
  let end = start + range
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i%j === 0) {
         isPrime = false
        break
      }
    }
    if (isPrime) {
      primes.push(i)
    }
     isPrime = true
  }

  console.info('Execution Time: %ds %dms', hrend[0], hrend[1] / 1000000)

}

generatePrimes(min, max)
//console.log(primes.join('\n'))
