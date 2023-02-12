// leetcode 2967 https://leetcode.com/problems/serialize-and-deserialize-binary-tree/

/** 
 * 1. 前序遍历树，每个元素之间添加分隔符，遇到的每个 null 结尾打上标记 "E"
 * 2. 最后合成一个字符串
 */

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function serialize(root: TreeNode | null): string {
    let preOrder: string[] = [];
    let count = 0;

    function traverse(root: TreeNode | null) {
        if (root === null) {
            // count += 1;
            preOrder.push('E&');
            return;
        }

        preOrder.push(root.val.toString() + '&');
        traverse(root.left);
        traverse(root.right);
    }
    traverse(root);
    let tmp = preOrder.join('')
    return tmp.slice(0, tmp.length - 1);
};

/** 
 * 1.将字符串根据分割符，解析成字符串数组
 * 2.和 serialize 函数一样，采用前序遍历，对每个非 null 标志的字符创建一个 TreeNode，遇到 null 标志字符则网回退一个节点，切换到另一个分支添加节点
*/

function deserialize(data: string): TreeNode | null {
    const dataList = data.split('&');

    function traverse(): TreeNode | null {

        // serialize() 提供的结果 dataList 结果最后一个元素一定是 "end"
        // 且至少有个一个 "end"
        // 所以在 deserialize 函数里不需要考虑数据列表为空的情况
        const rootVal = dataList.shift();

        if (rootVal === 'E') return null;

        const root = new TreeNode()
        root.val = Number(rootVal)
        root.left = traverse();
        root.right = traverse();
        return root;
    }
    return traverse();
};