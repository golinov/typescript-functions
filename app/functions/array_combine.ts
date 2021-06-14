module.exports = function (keys: [], values: []): {} {
    const result: any = {}
    const needleTypes = ['number', 'string']

    keys.map((value, key) => {
        if (needleTypes.includes(typeof value)) result[`${value}`] = values[key]
    })

    return result
}