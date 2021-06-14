const chunk = require('../functions/array_chunk')

function start(arr: any[]): void {
    if (!Array.isArray(arr)) throw 'Parameter arr must be array'

    arr = chunk(arr, 4)

    arr.map((value, i) => display(value, i + 1))
}
function display(value: any, i: number): void {

    setTimeout(function (): void {
        console.log(value, Date.now())
    }, i * 2000)
}

const data = [1, 23, 32, 43, 1, 23, 32, 43, 1, 23, 32, 43, 1, 23, 32, 43]

start(data)
