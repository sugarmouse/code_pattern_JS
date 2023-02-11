// leetcode 543 https://leetcode.com/problems/diameter-of-binary-tree/

// 思路: 树的 diameter 是 左子树最大深度 和 右子树最大深度 的和

function diameterOfBinaryTree(root: TreeNode | null): number {
    let diameter = 0;

    // 计算树的最大深度
    function maxDepth(root: TreeNode | null): number {

        // base case
        if (root === null) {
            return 0;
        }

        const left = maxDepth(root.left);
        const right = maxDepth(root.right);
        // 更新状态
        diameter = Math.max(diameter, left + right);

        // 返回当前节点为根节点的子树的最大深度
        return 1 + Math.max(left, right);
    }

    maxDepth(root);
    return diameter;
};
