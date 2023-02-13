// leecode 103  https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/

function zigzagLevelOrder(root: TreeNode | null): number[][] {
    if (root === null) return [];

    const q: TreeNode[] = [], ans: number[][] = []
    let level = 0;

    q.push(root);
    
    while (q.length > 0) {
        const levelNodeVals: number[] = [];
        const levelSize = q.length;

        level++;
        for (let i = 0; i < levelSize; i++) {
            let cur = q.shift();

            if (level % 2) {
                levelNodeVals.push(cur.val);
            } else {
                levelNodeVals.unshift(cur.val);
            }
            if (cur.left !== null) q.push(cur.left);
            if (cur.right !== null) q.push(cur.right);

        }
        ans.push(levelNodeVals);
    }
    return ans;
};