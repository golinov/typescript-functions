const dataArrayGet = require('../data')

function array_get (arr: any[], path: string): any {
    try {
        return eval(`arr${path}`)
    } catch (e) {
    }
}

console.log(array_get(dataArrayGet.testData4, '[5].name'))

module.exports = array_get