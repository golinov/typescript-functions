module.exports = function (arr: any[], skipNaN = false): number {
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