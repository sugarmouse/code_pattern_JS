function levelOrder(root: TreeNode | null): number[][] {

    if (!root) return []; // 特例处理

    const levelOrderVals: number[][] = [],
        q: TreeNode[] = [root]; // 遍历队列

    // q 不断保存每一层的节点
    // 处理完一层之后就推出这一层的节点，同时推入下一层的节点
    while (q.length > 0) {
        const curLevelSize = q.length,
            curLevelNodes: number[] = [];

        // 在进入 for 循环之前，当前队列存放的都是同一层的树节点
        for (let i = 0; i < curLevelSize; i++) {
            const curNode = q.shift();
            /*----层序遍历位置----*/
            // 在推入下一层元素之前先把当前层的点处理完成当前节点
            curLevelNodes.push(curNode.val);

            // 如果有左右节点，分别推入下一层的左右节点
            if (curNode.left) q.push(curNode.left);
            if (curNode.right) q.push(curNode.right);
        }
        // 此时，当前层的节点处理完成，同时下一层的节点被推入队列当中
        levelOrderVals.push(curLevelNodes);
    }
    return levelOrderVals;
};

export { };