const dataArrayPluck = require('../data')

const getByPath = (obj: any, path: string): any => {
    const keys: any = path.split('.')
    const object = obj[keys[0]]

    if (object && keys.length > 1) {
        return getByPath(object, keys.slice(1).toString())
    }

    return typeof object !== 'undefined' ? object : null
}

function array_pluck(arr: {[name: string]: any}[], path: string): any[] {
    const result: any[] = []

    arr.map(item => {
        const element = getByPath(item, path)
        if (element !== 'undefined') {
            result.push(element)
        }
    })

    return result
}

console.log(array_pluck(dataArrayPluck.testData3, 'skills.php'))

module.exports = array_pluck