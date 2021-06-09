const dataArrayChunk = require('../data')
const arraySlice = require('./array_slice')

function array_chunk (arr: any[], count: number): any[] {
    const result: any[] = []
    for (let i = 0; i < arr.length; i += count) {
        result.push(arraySlice(arr, i, i + count))
    }
    return result
}

console.log(array_chunk(dataArrayChunk.testData2, 2))

module.exports = array_chunk