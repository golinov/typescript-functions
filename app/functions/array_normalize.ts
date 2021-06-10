const dataArrayNormalize = require('../data')

type ObjectSchema = { [name: string]: Schema }

type Schema = 'function'
    | 'array'
    | 'string'
    | 'float'
    | 'int'
    | 'bool'
    | 'number'

const arrayHandler = function (this: { transform: boolean }, value: any) {
    if (this.transform) return Array.from(value)
    else if (Array.isArray(value)) return value
}

const stringHandler = function (this: { transform: boolean }, value: any) {
    if (this.transform) return String(value)
    else if (typeof value === 'string') return value
}

const floatHandler = function (this: { transform: boolean }, value: any) {
    if (this.transform) return parseFloat(value)
    else if (value.float) return value
}

const intHandler = function (this: { transform: boolean }, value: any) {
    if (this.transform) {
        const transformed: number = parseInt(value)
        if (!isNaN(transformed)) return transformed
    } else if (Number.isInteger(value)) return value
}

const boolHandler = function (this: { transform: boolean }, value: any) {
    if (this.transform) return Boolean(value)
    else if (typeof value === 'boolean') return value
}

const numberHandler = function (this: { transform: boolean }, value: any) {
    if (this.transform) {
        const transformed: number = Number(value)
        if (!isNaN(transformed)) return transformed
    }
    if (typeof value === 'number') return value
}

const objectHandler = function (this: { transform: boolean, schema: { [name: string]: Schema } }, value: any) {
    const field = (Object.keys(this.schema))[0]
    if (value instanceof Object && field in value) {
        let v: any
        if (this.transform) {
            switch (this.schema[field]) {
                case 'string':
                    v = String(value[field])
                    break
                case 'float':
                    v = parseFloat(value[field])
                    break
                case 'int':
                    v = parseInt(value[field])
                    break
                case 'bool':
                    v = Boolean(value[field])
                    break
                case 'function':
                    break
                case 'number':
                    v = Number(value[field])
                    break
                case 'array':
                    v = Array.from(value[field])
                    break
            }
        } else if (typeof value[field] === this.schema[field]) v = value[field]

        return v
            ? ({[field]: v})
            : null
    }
}

const functionHandler = function (this: { transform: boolean }, value: any) {
    if (this.transform) return 'nice'
    else if (typeof value === 'function') return value
}

function array_normalize(arr: any[], schema: Schema | ObjectSchema, transform = false): any[] {
    const result: any[] = []
    let handler: (value: any) => any = function (value: any): any {}

    switch (schema) {
        case 'array':
            handler = arrayHandler.bind({transform})
            break
        case 'string':
            handler = stringHandler.bind({transform})
            break
        case 'int':
            handler = intHandler.bind({transform})
            break
        case 'function':
            handler = functionHandler.bind({transform})
            break
        case 'number':
            handler = numberHandler.bind({transform})
            break
        case 'bool':
            handler = boolHandler.bind({transform})
            break
        case 'float':
            handler = floatHandler.bind({transform})
            break
        default:
            handler = objectHandler.bind({transform, schema})
    }

    for (let i = 0; i < arr.length; i++) {
        const handlerResult: any = handler(arr[i])
        if (handlerResult) result.push(handlerResult)
    }

    return result;
}

console.log(array_normalize(dataArrayNormalize.testData4, {age: 'float'}, true))

module.exports = array_normalize