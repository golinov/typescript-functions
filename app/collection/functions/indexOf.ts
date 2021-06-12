module.exports = function (arr: any[], searchElement: string, fromIndex = 0): number {
    for (let i = fromIndex || 0; i < arr.length; i++) {
        if (searchElement === arr[i]) return i
    }

    return -1
}