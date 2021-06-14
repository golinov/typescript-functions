const Collection = require('../Collection/Collection')

function Pagination(collection, limit) {
    if (!(collection instanceof Collection)) throw 'Argument collection must be instance of Collection'

    Object.defineProperty(this, '_cursor', {
        value: 1,
        writable: true
    })

    Object.defineProperty(this, '_items', {
        value: collection,
        writable: true
    })

    Object.defineProperty(this, '_limit', {
        value: limit,
        writable: true
    })

    return new Proxy(this, {
        get(target, prop) {
            if (prop === 'cursor') {
                return target._cursor
            }

            return target[prop]
        }
    })
}

Pagination.prototype.next = function () {
    if ((this._cursor * this._limit) <= this._items.length) {
        this._cursor += 1
    }

    return this.current()
}

Pagination.prototype.prev = function () {
    if (this._cursor > 0) {
        this._cursor -= 1
    }

    return this.current()
}

Pagination.prototype.paginate = function (limit) {
    if (limit < 0) throw 'parameter limit must be greater than 0'
    this._limit = limit

    return this
}

Pagination.prototype.page = function (page) {
    if (page <= this.count()) {
        this._cursor = page

        return this.current()
    }

    return this.last()
}

Pagination.prototype.last = function () {
    this._cursor = this.count()

    return this.current()
}

Pagination.prototype.first = function () {
    this._cursor = 1

    return this.current()
}

Pagination.prototype.count = function () {
    return Math.ceil(this._items.length / this._limit)
}

Pagination.prototype.reset = function () {
    this._cursor = 1
}

Pagination.prototype.current = function () {
    let i = this._limit * (this._cursor - 1)
    const end = i + this._limit
    const result = []

    for (i; (i < end && i < this._items.length); i++) {
        result.push(this._items[i])
    }

    return new Collection(result)
}

const arr = new Collection([1, 2, 3])

module.exports = Pagination