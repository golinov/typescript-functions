const items: any[] = [
    {
        id: 1,
        p_id: 6
    },
    {
        id: 2,
    },
    {
        id: 3,
        p_id: 4
    },
    {
        id: 4,
        p_id: 1
    },
    {
        id: 5,
    },
    {
        id: 6,
    }
]

function buildTree(arr: {}[]): {}[] {
    const result: {}[] = []
    const m: any[] = []

    items.map(i => {
        if (!i.p_id) result.push(i)
        m[i.p_id] = m[i.p_id] || []
        m[i.p_id].push(i)
        m[i.id] = m[i.id] || []
        i.child = m[i.id]
    })

    return result
}

console.log(buildTree(items))