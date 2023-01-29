// leetcode 2074  https://leetcode.com/problems/reverse-nodes-in-even-length-groups/


import { ListNode } from "../data_structures/linked-list/ListNode";

function reverseEvenLengthGroups(head: ListNode | null): ListNode | null {

    let node = head,
        l = 2; // l 用来记录下一次想要的走过的长度

    while (node.next !== null) {
        // n 记录实际走过的步数
        let n = 0,
            preNode = node;

        // node 指针往前走 l 步
        // 要注意最后一段可能不足 l ， 要用 n 记录真实走过的步数
        for (let i = 0; i < l; i++) {
            if (node.next === null) break;
            node = node.next;
            n++;
        }

        // 走过偶数次步，则翻转走过的节点
        if (n % 2 === 0) {
            let revHead = preNode.next,
                cur = preNode.next,
                reserve = node.next;
            for (let i = 0; i < n; i++) {
                let next = cur.next;
                cur.next = reserve;
                reserve = cur;
                cur = next;
            }
            preNode.next = reserve;
            node = revHead;
        }
        ++l;
    }
    return head;
};