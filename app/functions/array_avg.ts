import {testData, testData2} from '../data'

export const array_avg = (arr: Array<any>, skipNaN = false): number => {
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

    return Math.round(result/length)
}

console.log(array_avg(testData, true))