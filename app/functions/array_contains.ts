module.exports = function (arr: any[], search: string | RegExp) {
    let i = 0

    while (i < arr.length) {
        if (typeof arr[i] === 'string' && arr[i].match(search)) return true
        i++
    }

    return false
}