module.exports = function (arr: []): any[] {
    const result: any[] = []

    arr.map(item => {
        if (!result.includes(item)) result.push(item)
    })

    return result
}