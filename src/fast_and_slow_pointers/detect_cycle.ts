// leetcode 141 https://leetcode.com/problems/linked-list-cycle/

import { LinkedList, LinkedListNode } from "../DATA_STRUCTURE/linked_list";

/**
 * 解题思路：
 *    快慢两个指针在环形链表中一定会相遇
 * 
 * 时间复杂度：
 *    O(n)
 * 
 * 空间复杂度：
 *    O(1)
 */

/**
 * 检查链表是否为环形链表
 * @param {LinkedListNode<number> | null} head 
 * @returns boolean
 */
export function detectCycle(head: LinkedListNode<number> | null) {
  if (head === null || head.next == null) return false;
  let slow = head, fast = head.next;
  while (slow !== null && fast !== null) {
    slow = slow.next;
    if (fast) fast = fast.next;
    if (fast) fast = fast.next;
    if (fast === slow) return true;
  }
  return false;
}