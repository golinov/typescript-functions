const Pagination = require('../Pagination/Pagination')
const map = require('./functions/map')
const filter = require('./functions/filter')
const reduce = require('./functions/reduce')
// const every = require('./functions/every')
const sanitize = require('./functions/sanitize')
const toJSON = require('./functions/toJSON')
// const toQueryString = require('./functions/toQueryString')
const indexOf = require('./functions/indexOf')
const values = require('./functions/values')
const isEmpty = require('./functions/isEmpty')
const toString = require('./functions/toString')
const transform = require('./functions/transform')
const find = require('../functions/array_find')
const avg = require('../functions/array_avg')
const chunk = require('../functions/array_chunk')
const skipUntil = require('../functions/array_skip_until')
const contains = require('../functions/array_contains')
const get = require('../functions/array_get')
const normalize = require('../functions/array_normalize')
const pluck = require('../functions/array_pluck')
const unique = require('../functions/array_unique')
const fill = require('../functions/array_fill')
const sort = require('./functions/sort')

function Collection(arr = []) {
    if (!Array.isArray(arr)) throw 'data must be array'

    Object.defineProperty(this, '_items', {
        value: arr,
        enumerable: true
    })

    Object.defineProperty(this, '_length', {
        value: arr.length,
        writable: false,
        enumerable: false
    })

    return new Proxy(this, {
        get(target, prop) {
            if (typeof prop === 'string' && Number.isInteger(+prop) && !(prop in target)) {
                return target._items[prop]
            }
            if (prop === 'length') return target._length

            return target[prop]
        }
    })
}

Collection.make = (arr = []) => new Collection(arr)
Collection.map = (arr, callback) => new Collection(map(arr, callback))
Collection.filter = (arr, callback) => new Collection(filter(arr, callback))
Collection.reduce = (arr, callback, initialValue = null) => new Collection(reduce(arr, callback, initialValue))
Collection.indexOf = indexOf
Collection.isEmpty = isEmpty
Collection.find = (arr, search) => new Collection(find(arr, search))
Collection.toJSON = (arr) => toJSON(arr)
Collection.avg = avg
Collection.chunk = (arr, count) => new Collection(chunk(arr, count))
Collection.skipUntil = (arr, value) => new Collection(skipUntil(arr, value))
Collection.contains = contains
Collection.get = get
Collection.normalize = (arr, schema, transform = false) => new Collection(normalize(arr, schema, transform))
Collection.pluck = (arr, path) => new Collection(pluck(arr, path))
Collection.unique = (arr) => new Collection(unique(arr))
Collection.fill = (length, value) => new Collection(fill(length, value))
Collection.sort = (arr, compareFunction) => new Collection(sort(arr, true, '', compareFunction))
Collection.sortDesc = (arr, compareFunction) => new Collection(sort(arr, false, '', compareFunction))
Collection.sortBy = (arr, column, compareFunction) => new Collection(sort(arr, true, column, compareFunction))
Collection.sortByDesc = (arr, column, compareFunction) => new Collection(sort(arr, false, column, compareFunction))

Collection.prototype.map = function (callback) {
    return new Collection(map(this._items, callback))
}

Collection.prototype.toJSON = function () {
    return toJSON(this._items)
}

Collection.prototype.filter = function (callback) {
    return new Collection(filter(this._items, callback))
}

Collection.prototype.reduce = function (callback, initialValue = null) {
    return new Collection(reduce(this._items, callback, initialValue))
}

Collection.prototype.indexOf = function (searchElement, fromIndex = 0) {
    return indexOf(this._items, searchElement, fromIndex)
}

Collection.prototype.isEmpty = function () {
    return isEmpty(this._items)
}

Collection.prototype.values = function () {
    return values(this._items)
}

Collection.prototype.sanitize = function (callback) {
    sanitize(this._items, callback)

    return this
}

Collection.prototype.transform = function (callback) {
    transform(this._items, callback)

    return this
}

Collection.prototype.toString = function () {
    return toString(this._items)
}

Collection.prototype.find = function (search) {
    return new Collection(find(this._items, search))
}

Collection.prototype.avg = function (skipNaN) {
    return avg(this._items, skipNaN)
}

Collection.prototype.chunk = function (count) {
    return new Collection(chunk(this._items, count))
}

Collection.prototype.skipUntil = function (value) {
    return new Collection(chunk(this._items, value))
}

Collection.prototype.contains = function (search) {
    return contains(this._items, search)
}

Collection.prototype.get = function (path) {
    return get(this._items, path)
}

Collection.prototype.normalize = function (schema, transform = false) {
    return new Collection(normalize(this._items, schema, transform))
}

Collection.prototype.pluck = function (path) {
    return new Collection(pluck(this._items, path))
}

Collection.prototype.unique = function () {
    return new Collection(unique(this._items))
}

Collection.prototype.fill = function (length, value) {
    return new Collection(fill(length, value))
}

Collection.prototype.sort = function (callback) {
    sort(this._items, true, '', callback)

    return this
}

Collection.prototype.sortDesc = function (callback) {
    sort(this._items, false, '', callback)

    return this
}

Collection.prototype.sortBy = function (column, callback) {
    sort(this._items, true, column, callback)

    return this
}

Collection.prototype.sortByDesc = function (column, callback) {
    sort(this._items, false, column, callback)

    return this
}

Collection.prototype.values = function () {
    return Object.values(this._items)
}

Collection.prototype[Symbol.iterator] = function* () {
    for (let i = 0; i < this._items.length; i++) {
        yield this._items[i]
    }
}

Collection.prototype.paginate = function (limit) {
    if (limit < 0) throw 'parameter limit must be greater than 0'

    return new Pagination(this, limit)
}

const t = new Collection([123,123]).paginate(2).first().items
console.log(t)

module.exports = Collection