const Collection = require('../Collection/Collection')
const data = require('../data').testData4


const arr = new Collection(data)

console.log(arr.filter((i: any) => !!i.name).sort((a: any, b: any) => a.age > b.age ? -1 : 1).pluck('name').values())