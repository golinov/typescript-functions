module.exports = function (arr: any[], callback: (value: any, index?: number) => boolean): any[] {
    const result: any[] = []

    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i) === true) result.push(arr[i])
    }

    return result
}