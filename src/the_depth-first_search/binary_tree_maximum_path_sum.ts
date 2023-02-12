// leetcode 124  https://leetcode.com/problems/binary-tree-maximum-path-sum/



function maxPathSum(root: TreeNode | null): number {
    let ans = -1 * Infinity;

    // 计算以某个节点为根节点的子树对应的最大路径和
    function maxSum(root: TreeNode | null): number {
        if (root === null) return 0;

        const left = maxSum(root.left),
            right = maxSum(root.right);

        if (left >= 0 && right >= 0) {
            ans = Math.max(ans, left + right + root.val);
        } else if (left < 0 && right < 0) {
            ans = Math.max(ans, root.val);
            return root.val;
        } else {
            ans = Math.max(root.val + Math.max(left, right), ans);
        }

        return Math.max(left, right) + root.val;
    }
    maxSum(root);
    return ans;
};