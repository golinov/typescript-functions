const arrayGet = require('./array_get')

function array_search(arr: any[], search: string | RegExp, path = ''): { path: string, value: string }[] {
    const result: { path: string, value: string }[] = []
    let arrayByPath: any[] | string = path.length
        ? arrayGet(arr, path)
        : arr

    if (typeof arrayByPath === 'string' && arrayByPath.match(search)) {
        result.push({path: path, value: arrayByPath})
    } else if (typeof arrayByPath === 'object') {
        if (Array.isArray(arrayByPath) === false) {
            Object.entries(arrayByPath).map(([key, value]) => {
                const iterablePath = path
                    ? `${path}.${key}`
                    : `${key}`

                if (typeof value === 'object') array_search(arr, search, iterablePath).map(i => result.push(i))
                if (typeof value === 'string' && value.match(search)) result.push({path: iterablePath, value: value})
            })
        } else {
            arrayByPath.map((value, key) => {
                const iterablePath = path
                    ? `${path}[${key}]`
                    : `[${key}]`

                if (typeof value === 'object') array_search(arr, search, iterablePath).map(i => result.push(i))
                if (typeof value === 'string' && value.match(search)) result.push({path: iterablePath, value: value})
            })
        }
    }

    return result
}

module.exports = array_search