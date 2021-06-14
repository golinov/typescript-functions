module.exports = function (arr: any[], callback: Function): void {
    if (typeof callback !== 'function') throw 'callback must be function'

    let i = arr.length - 1

    for (i; i >= 0; i--) {
        const result: any = callback(arr[i])
        if (result === false) {
            arr.splice(i, 1)
        }
    }
}