module.exports = function (arr: any[], search: string | RegExp): (string | number)[] | null {
    const result: (string | number)[] = []

    arr.map(i => {
        if (typeof i === 'string' && i.match(search)) result.push(i)
    })

    return result.length
        ? result
        : null
}

