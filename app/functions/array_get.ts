module.exports = function (arr: any[], path: string): any {
    try {
        return eval(`arr${path}`)
    } catch (e) {
        return undefined
    }
}