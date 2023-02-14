// leetcode 997 https://leetcode.com/problems/vertical-order-traversal-of-a-binarrow-tree/


function verticalTraversal(root: TreeNode | null): number[][] {
    if (root === null) return [];;
    const ans: number[][] = [];
    let q: [TreeNode, [number, number]][] = [],
        map = new Map<number, [number, number][]>(),
        row = 0
    q.push([root, [0, row]]);


    // BFS 存储节点信息 {col:}
    while (q.length > 0) {
        const levelSize = q.length;
        row++;
        for (let i = 0; i < levelSize; i++) {
            const [cur, [col, level]] = q.shift();
            // map 根据 col 存入节点值
            if (map.has(col)) {
                map.get(col).push([cur.val, level])
            } else {
                map.set(col, [[cur.val, level]])
            }
            // 推入左右节点
            if (cur.left !== null) {
                q.push([cur.left, [col - 1, row]])
            }
            if (cur.right !== null) {
                q.push([cur.right, [col + 1, row]])
            }
        }
    }

    // 从 map 拿出数据排序，存入ans
    // map -> {col:[...[val,row]...]}
    const cols = [...map.keys()].sort((a, b) => a - b)

    for (const col of cols) {
        const tmp:number[] = []
        const curCol = map.get(col).sort((a, b) => {
            if (a[1] === b[1]) return a[0] - b[0];
            else return a[1] - b[1];
        }).forEach(item => {
            tmp.push(item[0])
        })
        ans.push(tmp)
    }

    return ans;
};


// 节点信息也可以用 DFS, 之后的排序处理一样
// 存入 DFS 遍历节点，对应的值存入 map
function traverse(node: TreeNode, col: number, row: number, mp: Map<number, [number, number][]>) {
    if (!node) return;
    if (mp.has(col)) mp.get(col).push([row, node.val]);
    else mp.set(col, [[row, node.val]]);
    traverse(node.left, col - 1, row + 1, mp);
    traverse(node.right, col + 1, row + 1, mp);
}
