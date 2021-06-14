module.exports = function (arr: any[], callback: Function): void {
    if (typeof callback !== 'function') throw 'callback must be function'

    for (let i = 0; i < arr.length; i++) {
        arr[i] = callback(arr[i])
    }
}