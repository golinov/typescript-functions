const dataArraySkipUntil = require('../data')
const arraySlice = require("./array_slice")

function array_skip_until(arr: any[], value: any): any[] {
    let i = 0
    const length = arr.length
    while (i < length) {
        if (arr[i] === value) break
        i++
        if (length === i) return []
    }
    return arraySlice(arr, i)
}

console.log(array_skip_until(dataArraySkipUntil.testData, false))

module.exports = array_skip_until