const data = require('../data').testData3
const Collection = require('../Collection/Collection')

function start(data: any[]) {
    const result: {[name: string]: string} = {}

    for (const value of Object.keys(data[0].skills)) {
        result[value] = new Collection(data)
            .sortByDesc(`skills.${value}`)
            .pluck('name')
            .values()
    }

    return result
}

console.log(start(data))
