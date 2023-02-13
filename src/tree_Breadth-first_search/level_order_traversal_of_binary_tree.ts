// leetcode 102  https://leetcode.com/problems/binary-tree-level-order-traversal/

function levelOrder(root: TreeNode | null): number[][] {

    if (!root) return []; // 特例处理

    const ans: number[][] = [],
        queue: TreeNode[] = []; // 遍历队列
    queue.push(root);

    while (queue.length > 0) {
        const curLevelSize = queue.length;
        const curLevelNodesVal: number[] = [];
        for (let i = 0; i < curLevelSize; i++) {
            const curNode = queue.shift();
            if (curNode) {
                /*----层序遍历位置----*/
                curLevelNodesVal.push(curNode.val);
                if (curNode.left) {
                    queue.push(curNode.left);
                }
                if (curNode.right) {
                    queue.push(curNode.right);
                }
            }
        }
        ans.push(curLevelNodesVal);
    }
    return ans;
}