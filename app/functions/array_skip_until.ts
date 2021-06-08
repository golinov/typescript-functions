import {testData} from '../data'
import {slice} from "./array_slice";

export const array_skip_until = (arr: Array<any>, value: any): Array<any> => {
    let i = 0
    const length = arr.length
    while (i < length) {
        if (arr[i] === value) break
        i++
        if (length === i) return []
    }

    return slice(arr, i)
}

console.log(array_skip_until(testData, 23))