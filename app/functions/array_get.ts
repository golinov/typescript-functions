module.exports = function (arr: any[], path: string): any {
    path = path.charAt(0) === '['
        ? path
        : `.${path}`

    try {
        return eval(`arr${path}`)
    } catch (e) {
        return undefined
    }
}