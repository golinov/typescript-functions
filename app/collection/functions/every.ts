module.exports = function (arr = [], callback: Function): boolean {
    for (let i = 0; i < arr.length; i++) {
        console.log('nice')
        if (callback(arr[i], i, arr) === false) return false
    }

    return true
}