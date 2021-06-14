module.exports = function (arr: any[]) {
    const result: any[] = []

    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i])
    }

    return result
}