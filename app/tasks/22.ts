const Collection = require('../Collection/Collection')

function toPagination(...args: any) {
    const limit = args.slice(-1)
    const data = args.slice(0, -1)

    return new Collection(data).paginate(limit)
}

console.log(toPagination('asd', 'asd', 'asd', 2))