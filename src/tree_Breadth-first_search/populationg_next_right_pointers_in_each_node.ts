// leetcode 116 https://leetcode.com/problems/populating-next-right-pointers-in-each-node/description/


// class Node {
//     val: number;
//     left: Node | null;
//     right: Node | null;
//     next: Node | null;
//     constructor(val?: number, left?: Node, right?: Node, next?: Node) {
//         this.val = (val === undefined ? 0 : val);
//         this.left = (left === undefined ? null : left);
//         this.right = (right === undefined ? null : right);
//         this.next = (next === undefined ? null : next);
//     }
// }



function connect_recursive(root: Node | null): Node | null {
    if (root === null) return null;
    let left = connect_recursive(root.left);
    let right = connect_recursive(root.right);

    while (left !== null ) {
        left.next = right
        left = left.right;
        right = right.left;
    }

    return root;
};




function connect_BFS(root: Node | null): Node | null {

    if (root === null) return null;
    let q: Node[] = [];
    let level = 0;

    q.push(root);

    while (q.length > 0) {
        const levelSize = q.length;
        let count = 0;
        for (let i = 0; i < levelSize; i++) {
            let curNode = q.shift();
            count++;
            if (count < Math.pow(2, level)) {
                curNode.next = q[0];
            }

            if (curNode.left !== null) q.push(curNode.left);
            if (curNode.right !== null) q.push(curNode.right);
        }
        level++;
    }
    return root;
};