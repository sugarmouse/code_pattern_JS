// leecode 114 https://leetcode.com/problems/flatten-binary-tree-to-linked-list/

/**
 Do not return anything, modify root in-place instead.
 */

function flatten(root: TreeNode | null): void {
 
    if (root === null) return;

    // flatten 左右两边的子树
    flatten(root.left);
    flatten(root.right);
    
    // 用一个变量记录右子树，将 root 的右指针指向左子树
    // 左子树置空
    const right = root.right;
    root.right = root.left;
    root.left = null;

    // 找到拼接后的又子树的叶子结点，将原右子树接上
    let rightEnd = root
    while (rightEnd.right !== null)
        rightEnd = rightEnd.right;

    rightEnd.right = right;
};