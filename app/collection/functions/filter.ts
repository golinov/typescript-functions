module.exports = function (arr: any[], callback: Function): any[] {
    const result: any[] = []

    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i]) === true) result.push(arr[i])
    }

    return result
}