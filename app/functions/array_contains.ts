const dataArrayContains = require("../data");

function array_contains(arr: any[], search: string | RegExp) {
    let i = 0
    while (i < arr.length) {
        if (typeof arr[i] === 'string' && arr[i].match(search)) return true
        i++
    }

    return false
}

const regExp = new RegExp(/^raf.*/i)

// console.log(array_contains(dataArrayContains.testData4, regExp))
console.log(array_contains(dataArrayContains.testData4, 'Vasya'))

module.exports = array_contains