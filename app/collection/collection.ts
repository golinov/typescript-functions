const map = require('./functions/map')
const filter = require('./functions/filter')

export interface ICollection {
    items: any[]
    length: number
    map(arr: any[], callback: Function): ICollection
    make(): ICollection
    filter(): ICollection
}

function Collection(this: ICollection, items = []) {
    this.items = items
    this.length = items.length
}

Collection.prototype.map = function (this: ICollection, callback: Function): ICollection {
    return new (Collection as any)(map(this.items, callback))
}

Collection.prototype.filter = function (this: ICollection, callback: Function): ICollection {
    return new (Collection as any)(filter(this.items, callback))
}

Collection.make = (arr: any[] = []) => new (Collection as any)(arr)

Collection.map = (arr: any[], callback: Function): ICollection => new (Collection as any)(map(arr, callback))

Collection.filter = (arr: any[], callback: Function): ICollection => new (Collection as any)(arr).filter(this, callback)

let test = new (Collection as any)()

const tf = Collection.make([1,23,4])

// console.log(tf.map((i: any) => i).filter((i: any) => i > 2))
console.log(Collection.map([1,23,4], (i: any) => i))

module.exports = Collection