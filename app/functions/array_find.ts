import {testData} from '../data'

export const array_find = (arr: Array<any>, search: string|RegExp): Array<string|number>|null => {
    const result: Array<string|number> = []
    arr.map(i => {
        if (i === +search || i === search) result.push(i)
    })

    return result.length
        ? result
        : null
}

console.log(array_find(testData, 'Rafshan'))

