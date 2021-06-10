function slice(arr: any[], start: number, end?: number): any[] {
    const result: any[] = []
    if (!end) end = arr.length
    if (end <= start) return result
    while (start < end) {
        if (arr[start] !== 'undefined') result.push(arr[start])
        start++
    }
    return result
}

module.exports = slice