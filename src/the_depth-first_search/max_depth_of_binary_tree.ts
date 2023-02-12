// leetcode 104 https://leetcode.com/problems/maximum-depth-of-binary-tree/

// 回溯思想
function maxDepth(root: TreeNode | null): number {
    let trackDep = 0, ans = 0;

    function traverse(root: TreeNode | null) {
        if (root === null) {
            ans = Math.max(ans, trackDep);
            return;
        }
        trackDep++;
        traverse(root.left);
        traverse(root.right);
        trackDep--;
    }
    traverse(root);
    return ans;
};
