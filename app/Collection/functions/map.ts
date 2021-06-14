module.exports = function (arr: any[], callback: Function): any[] {
    const result: any[] = []

    for (let i = 0; i < arr.length; i++) {
        result.push(callback(arr[i]))
    }

    return result
}