// lc 337  https://leetcode.com/problems/house-robber-iii/


function rob(root: TreeNode | null): number {
    const memo = new Map<TreeNode, number>();
    return robWithMemo(root, memo);
}
// 返回以当前节点为根节点的子树所能抢到的最大金额
function robWithMemo(root: TreeNode | null, memo: Map<TreeNode, number>): number {
    if (root === null) return 0;
    if (memo.has(root)) return memo.get(root);

    const robRoot = root.val
        + (root.left === null ? 0 : robWithMemo(root.left.left, memo) + robWithMemo(root.left.right, memo))
        + (root.right === null ? 0 : robWithMemo(root.right.left, memo) + robWithMemo(root.right.right, memo));

    const notRobRoot = robWithMemo(root.left, memo) + robWithMemo(root.right, memo);

    const res = Math.max(robRoot, notRobRoot);

    memo.set(root, res);

    return res;
}



// 减少空间复杂度
function rob_2(root: TreeNode | null): number {
    return Math.max(...dp(root))
}

// 返回一个大小为 2 的数组
// arr[0] 表示不抢 root 得到的最多的钱
// arr[1] 表示抢 root 得到的最多的钱
function dp(root: TreeNode | null): [number, number] {
    if (root === null) return [0, 0];
    const left = dp(root.left),
        right = dp(root.right);

    const robRoot = root.val + left[0] + right[0];
    const notRobRoot = Math.max(...left) + Math.max(...right);
    
    return [notRobRoot, robRoot];
}


export { };