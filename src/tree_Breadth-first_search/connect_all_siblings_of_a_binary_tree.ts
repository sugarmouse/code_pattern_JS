// leetcode 117  https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/description/

class Node {
    val: number;
    left: Node | null;
    right: Node | null;
    next: Node | null;
    constructor(val?: number, left?: Node, right?: Node, next?: Node) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
        this.next = (next === undefined ? null : next);
    }
}

function connect(root: Node | null): Node | null {
    if (root === null) return root;
    // dummy.next 用来记录下一层最左侧开始的节点
    let dummy: Node = new Node(-1);
    let pre = dummy, cur = root;

    // 完成下一层的相邻节点的连接
    while (cur !== null) {
        if (cur.left) {
            pre.next = cur.left;
            pre = pre.next;
        }
        if (cur.right) {
            pre.next = cur.right;
            pre = pre.next;
        }
        cur = cur.next;
    }
    
    // 继续连接下一层的相邻节点
    connect(dummy.next);
    return root;
};

export { };