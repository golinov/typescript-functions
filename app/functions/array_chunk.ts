import {testData2} from '../data'
import {slice} from './array_slice'

export const array_chunk = (arr: Array<any>, count: number): Array<any> => {
    const result = []
    for (let i = 0; i < arr.length; i += count) {
        result.push(slice(arr, i, i + count))
    }
    return result
}

console.log(array_chunk(testData2, 2))