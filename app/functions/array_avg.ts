const dataArrayAvg = require('../data')

function array_avg(arr: any[], skipNaN = false): number {
    let result = 0
    let length = skipNaN
        ? 0
        : arr.length
    arr.map(i => {
        if (typeof i === 'number') {
            result += i
            if (skipNaN) length += 1
        }
    })

    return Math.round(result / length)
}

console.log(array_avg(dataArrayAvg.testData, true))
console.log(array_avg(dataArrayAvg.testData2, true))

module.exports = array_avg