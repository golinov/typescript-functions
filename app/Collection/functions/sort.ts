let count = 0

const objectCompareFunction: (a: {[name: string]: any}, b: {[name: string]: any}) => number = (a, b) => {
    const key: string = Object.keys(a)[0]

    if (a[key] > b[key]) return -1

    return 1
}

module.exports = function (arr: any[], asc: boolean, column = '', compareFunction?: (a: any, b: any) => number): any[] {
    const length = arr.length
    if (!length) return []
    if (compareFunction && typeof compareFunction !== 'function') throw 'parameter compareFunction must be function'
    if (!column.length && arr[0] instanceof Object) compareFunction = objectCompareFunction

    for (let i = length - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            let result = 0

            if (compareFunction) {
                result = column.length
                    ? compareFunction((arr[j - 1][column]), arr[j][column])
                    : compareFunction((arr[j - 1]), arr[j])
            } else {
                result = column.length
                    ? (arr[j - 1][column] > arr[j][column] ? -1 : 0)
                    : (arr[j - 1] > arr[j] ? -1 : 0)
            }

            if ((asc === true && result < 0) || (asc === false && result > 0)) {
                const tmp = arr[j - 1]
                arr[j - 1] = arr[j]
                arr[j] = tmp
            }

            count += 1
        }
    }

    console.log(count)

    return arr
}