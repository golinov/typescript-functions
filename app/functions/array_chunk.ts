const slice = require('./array_slice')

module.exports = function (arr: any[], count: number): any[] {
    const result: any[] = []

    for (let i = 0; i < arr.length; i += count) {
        result.push(slice(arr, i, i + count))
    }

    return result
}