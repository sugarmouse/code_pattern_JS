// leetcode 876  https://leetcode.com/problems/middle-of-the-linked-list/description/

import { LinkedListNode, LinkedList } from "../DATA_STRUCTURE/linked_list";

/**
 * 解题思路：
 *    快指针以慢指针两倍的速度跑，快指针到队尾，慢指针在中间
 * 
 * 时间复杂度：
 *    O(n)
 * 
 * 空间复杂度：
 *    O(1)
 */

/**
 * 移动快慢两个指针，快指针到达队尾时，慢指针正好在中间节点
 * @param head - linkedList 的 head
 * @returns linkedList 的中间节点
 */
export function getMiddleNode<V>(head: LinkedListNode<V>): LinkedListNode<V> {
  if (head === null || head.next === null) return head;
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
}