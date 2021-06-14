module.exports = function(arr: any[], callback: Function, initialValue?: any): any {
    let result: any = initialValue

    for (let i = 0; i < (arr.length - 1); i++) {
        result = callback(result || arr[i], arr[i + 1])
    }

    return result
}