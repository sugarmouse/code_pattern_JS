// leetcode 24 https://leetcode.com/problems/swap-nodes-in-pairs/

import { ListNode } from "../data_structures/linked-list/ListNode";

/**
 * 1. 检查剩下的节点中是否有两个节点
 * 2. 有两个节点则翻转，然后和剩下的链表连接上
 * 3. 重复以上操作直到链表遍历结束
 */

function swapPairs(head: ListNode | null): ListNode | null {
  let dummy = new ListNode(0);
  dummy.next = head;

  let node = dummy;

  while (node.next !== null) {
    let preNode = node;
    let isLastSingle = false;

    for (let i = 0; i < 2; i++) {
      if (node.next === null) {
        isLastSingle = true;
        break;
      }
      node = node.next;
    }

    if (isLastSingle) break;

    let reserve = node.next,
      first = preNode.next;

    preNode.next = node;
    node.next = first;
    first.next = reserve;
    node = first;
  }
  return dummy.next;
};