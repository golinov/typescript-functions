function toJSON(arr: any[]): string {
    let result = '['
    const length = arr.length

    for (let i = 0; i < length; i++) {
        if (typeof arr[i] === 'function') {
            result += null
        } else if (arr[i] instanceof Object && !Array.isArray(arr[i])) {
            result += parseObject(arr[i])
        } else {
            result += arr[i]
        }

        if (i < length - 1) result += ','
    }

    return result += ']'
}

function parseObject(obj: {}) {
    let result = '{'
    const arr = Object.entries(obj)
    let i = 1
    for (const [k, v] of arr) {
        const key = `"${k}":`
        let value = ''
        if (typeof v === 'function') value += null
        else if (v instanceof Object && !Array.isArray(v)) value = parseObject(v)
        else if (Array.isArray(v)) value = toJSON(v)
        else value = `"${v}"`

        result += key + value

        if (i < arr.length) result += ','
        i++
    }

    return result += '}'
}

module.exports = toJSON