module.exports = function (arr: any[], callback: (element: any, index: number, array: any[]) => boolean): boolean {
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr) === false) return false
    }

    return true
}