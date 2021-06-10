function array_fill(length: number, value: any): any[] {
    const result: any[] = []

    for (let i = 0; i < length; i++) {
        result.push(value)
    }

    return result
}

console.log(array_fill(5, 'string'))

module.exports = array_fill