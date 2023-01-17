// leetcode 206 https://leetcode.com/problems/reverse-linked-list/description/

import { ListNode } from "../data_structures/linked-list/ListNode";

function reverseList(head: ListNode | null): ListNode | null {

  let preNode: ListNode | null = null;
  let nexNode: ListNode | null = null;
  while (head !== null) {
    nexNode = head.next;
    head.next = preNode;
    preNode = head;
    head = nexNode;
  }
  return preNode;
};
