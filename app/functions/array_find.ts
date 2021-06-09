const dataArrayFind = require('../data')

function array_find (arr: any[], search: string|RegExp): (string|number)[]|null {
    const result: (string|number)[] = []
    arr.map(i => {
        if (typeof i === 'string' && i.match(search)) result.push(i)
    })

    return result.length
        ? result
        : null
}

console.log(array_find(dataArrayFind.testData, 'Rafshan'))

module.exports = array_find

