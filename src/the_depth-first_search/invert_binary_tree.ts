// leetcode 226 https://leetcode.com/problems/invert-binary-tree/

function invertTree(root: TreeNode | null): TreeNode | null {

    function traverse(root: TreeNode | null) {
        
        if (root === null) return;
        
        // 交换当前节点的左右分支
        [root.left, root.right] = [root.right, root.left];

        // 接着反转左右子分支
        traverse(root.left);
        traverse(root.right);
    }
    traverse(root);
    return root;

};