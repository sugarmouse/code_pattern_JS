// leetcode 1721  https://leetcode.com/problems/swapping-nodes-in-a-linked-list/

import { ListNode } from "../data_structures/linked-list/ListNode";

/**
 * You are given the head of a linked list, and an integer k.
 * Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).
 * 
 *  1 =< k <= n
 */

/**
 * 1.遍历链表，找到第 k 个 node，并且计算出长度
 * 2.找到 length - k + 1 个节点
 * 3.交换前后两个节点的值
 */

function swapNodes(head: ListNode | null, k: number): ListNode | null {
  let length = 0;
  let kNode = null, tmp = head;
  while (tmp !== null) {
    if (length + 1 === k) kNode = tmp;
    tmp = tmp.next;
    length++;
  }

  tmp = head;
  for (let i = 1; i < length - k + 1; i++) {
    tmp = tmp.next;
  }

  [kNode.value, tmp.value] = [tmp.value, kNode.value];
  return head;
}

// amazing method
// 只用一次循环解决
function swapNodes2(head: ListNode | null, k: number): ListNode {
  let n1: ListNode | null = null, n2: ListNode | null = null;
  for (let p = head; p !== null; p = p.next) {
    n2 = n2 === null ? null : n2.next;
    if (--k == 0) {
      n1 = p;
      n2 = head;
    }
  }
  [n1.value, n2.value] = [n2.value, n1.value];
  return head;
}