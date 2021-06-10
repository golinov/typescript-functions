import {ICollection} from "../collection";

function array_filter(collection: ICollection, callback: Function): any[] {
    const result: any[] = []

    for (let i = 0; i < collection.length; i++) {
        if (callback(collection.items[i]) === true) result.push(collection.items[i])
    }

    return result
}

module.exports = array_filter