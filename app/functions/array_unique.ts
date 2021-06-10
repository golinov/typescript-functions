const dataArrayUnique = require('../data')

function array_unique(arr: []): any[] {
    const result: any[] = []
    arr.map(item => {
        if (!result.includes(item)) result.push(item)
    })

    return result
}

console.log(array_unique(dataArrayUnique.testData.concat(dataArrayUnique.testData2)))

module.exports = array_unique