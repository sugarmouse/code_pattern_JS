// leetcode 234 https://leetcode.com/problems/palindrome-linked-list/

/**
 * 解题思路：
 *    1.快慢指针找到中位点
 *    2.反转后半部分
 *    3.比较前半部分和后半部分的值是否相等，出现不相等返回 false，全部比较完成之后返回 true
 * 
 * 时间复杂度：
 *    O(n)
 * 
 * 空间复杂度：
 *    O(1) 只用到了常数个指针变量
 */
import { LinkedListNode } from "../DATA_STRUCTURE/linked_list";

type numberLinkedListNode = LinkedListNode<number> | null;

//输入  1 -> 4 -> 5 -> 4 -> 1 -> null
export function isPalindrome(head: numberLinkedListNode): boolean {

  // 找中位节点
  let slow = head, fast = head;
  while (fast !== null) {
    if (slow) slow = slow.next;
    if (fast) fast = fast.next;
    if (fast) fast = fast.next;
  }
  // 1 -> 4 -> 5 -> 4 -> 1 -> null
  //                |          |
  //               slow       fast

  // 反转后半部分链表
  let midNode = slow && reverse(slow);
  //               null
  //                |
  // 1 -> 4 -> 5 -> 4 <- 1
  //                |    |
  //              slow  midNode 

  // 找到 slow 的前一项,使其 next 指向原始的队尾元素，成为一个新的单向链表
  // 其实没必要，因为后面比较两边的值，从两头出发，同时往中间出发是一样的
  // let preMidNode: ListNode | null = head;
  // while (preMidNode && preMidNode.next !== slow) preMidNode = preMidNode.next;
  // if (preMidNode) preMidNode.next = midNode;

  // 比较前后两部分的节点值是否相同
  let start = head;
  while (midNode !== null) {
    if (start && start.data !== midNode.data) return false;
    start = start && start.next;
    midNode = midNode.next;
  }
  return true;
};

/**
   * 反转链表，传入的链表头指向 null
   * leetcode 206 https://leetcode.com/problems/reverse-linked-list/
   * @param numberLinkedListNode node - 链表
   * @returns 反转后的链表的头
   */
function reverse(node: numberLinkedListNode): numberLinkedListNode {
  if (node === null || node.next === null) return node;
  let preNode: numberLinkedListNode = null;
  let nextNode: numberLinkedListNode = null;
  while (node !== null) {
    nextNode = node.next;
    node.next = preNode;
    preNode = node;
    node = nextNode;
  }
  return preNode;
};