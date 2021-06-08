export const slice = (arr: Array<any>, start: number, end?: number): Array<any> => {
    const result: Array<any> = []
    if (!end) end = arr.length
    if (end <= start) return result
    while (start < end) {
        if (arr[start] !== 'undefined') result.push(arr[start])
        start++
    }
    return result
}