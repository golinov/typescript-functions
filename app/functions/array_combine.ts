const dataArrayCombine = require('../data')

function array_combine(keys: [], values: []): {} {
    const result: any = {}
    const needleTypes = ['number', 'string']

    keys.map((value, key) => {
        if (needleTypes.includes(typeof value)) result[`${value}`] = values[key]
    })

    return result
}

console.log(array_combine(dataArrayCombine.testData, dataArrayCombine.testData2))

module.exports = array_combine