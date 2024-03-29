type ObjectSchema = { [name: string]: Schema }

type Schema = 'function'
    | 'array'
    | 'string'
    | 'float'
    | 'int'
    | 'bool'
    | 'number'

const toArray = (item: any): any[] => {
    switch (typeof item) {
        case 'number':
            return Array.from([item])
        case 'boolean':
            return Array.from([item])
        case 'object':
            return Array.isArray(item) ? item : Object.entries(item)
        default:
            return Array.from(item)
    }
}

const arrayHandler = function (this: { transform: boolean }, value: any) {
    if (this.transform) return toArray(value)
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

    if (value instanceof Object && !Array.isArray(value) && field in value) {
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
                    //:TODO implement transform to function
                    break
                case 'number':
                    v = Number(value[field])
                    break
                case 'array':
                    v = toArray(value[field])
                    break
            }
        } else if (typeof value[field] === this.schema[field]) v = value[field]

        return v
            ? ({[field]: v})
            : null
    }
}

const functionHandler = function (this: { transform: boolean }, value: any) {
    if (this.transform) return //TODO: implement transform to function
    else if (typeof value === 'function') return value
}

module.exports = function (arr: any[], schema: Schema | ObjectSchema, transform = false): any[] {
    const result: any[] = []
    let handler: (value: any) => any = (value: any): any => {}

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
        if (handlerResult || typeof handlerResult === 'boolean') result.push(handlerResult)
    }

    return result;
}