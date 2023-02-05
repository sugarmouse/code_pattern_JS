// leetcode 23 https://leetcode.com/problems/merge-k-sorted-lists/

import { ListNode } from "../data_structures/linked-list/ListNode";

/**
 * We merge the first half of the list with the second half of the list, and then merge the two halves
 * together
 * @param lists - an array of linked lists
 * @returns The head of the merged list
 */
function mergeKLists_recursion(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 1) return lists[0];
  if (lists.length === 0) return null;
  const half = Math.floor(lists.length / 2);
  const head1 = mergeKLists_recursion(lists.slice(0, half)), head2 = mergeKLists_recursion(lists.slice(half));
  return merge2Lists(head1, head2);
};


/**
 * We merge lists in pairs, then merge the resulting lists in pairs, and so on
 * @param {Array<ListNode> | null} lists - the array of linked lists
 * @returns the merged list.
 */
function mergeKLists_iteration(lists: Array<ListNode> | null): ListNode | null {
  if (lists.length > 0) {
    let step = 1;
    while (step < lists.length) {
      for (let i = 0; i < lists.length - step; i = i + step * 2) {
        lists[i] = merge2Lists(lists[i], lists[i + step]);
      }
      step *= 2;
    }
    return lists[0];
  }
  return null;
}


/**
 * We merge two sorted lists into one sorted list
 * @param {ListNode | null} head1 - the head of the first linked list
 * @param {ListNode | null} head2 - ListNode | null
 * @returns The head of the sorted list.
 */
function merge2Lists(head1: ListNode | null, head2: ListNode | null): ListNode | null {
  const dummy = new ListNode(-1);
  let cur = dummy;

  while (head1 !== null && head2 !== null) {
    if (head1.val <= head2.val) {
      cur.next = head1;
      head1 = head1.next;
    } else {
      cur.next = head2;
      head2 = head2.next;
    }
    cur = cur.next;
  }

  if (head1 === null) cur.next = head2;
  else cur.next = head1;

  return dummy.next;
}