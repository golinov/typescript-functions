const arraySlice = require('./array_slice')

module.exports = function (arr: any[], value: any): any[] {
    let i = 0
    const length = arr.length

    while (i < length) {
        if (arr[i] === value) break
        i++
        if (length === i) return []
    }

    return arraySlice(arr, i)
}