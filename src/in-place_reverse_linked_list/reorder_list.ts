// leetcode 143  https://leetcode.com/problems/reorder-list/

import { ListNode } from "../data_structures/linked-list/ListNode";

/**
 * 1. 找到中间节点，如果总节点数为偶数节点，选择后面的 node
 * 2. 翻转第二部分节点
 * 3. 将第一部分和第二部分合并
 */

// 注意不能改变 head
function reorderList(head: ListNode): void {
  if (head == null)
    return;

  // 找到链表的中点
  let slow = head,
    fast = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 原地翻转后半部分链表
  let prev = null,
    curr = slow;
  while (curr != null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // 此时 prev 指向最后一个节点，也就是翻转后的 second 的头
  let first = head,
    second = prev;
  //合并前后两部分
  while (second.next != null) {
    let temp1 = first.next,
      temp2 = second.next;
    first.next = second;
    first = temp1;
    second.next = temp1;
    second = temp2;
  }
}