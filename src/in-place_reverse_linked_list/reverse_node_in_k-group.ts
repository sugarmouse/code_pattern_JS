import { ListNode } from "../data_structures/linked-list/ListNode";
// 检查链表中是否有 k 个 nodes
// 反转 k 个 nodes 
// 重新连接已经反转的 k 个 node 和 链表中剩下的 nodes
// 重复以上步骤直到链表中剩下的 nodes 数量少于 k

function len(head: ListNode) {
  let count = 0;
  let current = head,
    nxt = null;

  while (current != null) {
    count++;
    nxt = current.next;
    current = nxt;
  }
  return count;
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let leftNode = len(head);
  if (leftNode < k) return head;

  // reverse first k nodes
  let pre = null;
  let next = null;
  let cur = head;
  let tmpTail = head;
  for (let i = 0; i < k; i++) {
    next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = cur.next;
  }
  const newHead = pre;
  leftNode -= k;


  // reverse rest nodes
  while (leftNode >= k) {

    let preNode = null;
    let nextNode = null;
    let potentialTail = cur; // record cur head to be next tail
    for (let i = 0; i < k; i++) {
      nextNode = cur.next;
      cur.next = preNode;
      preNode = cur;
      cur = cur.next;
    }
    tmpTail.next = preNode; // 
    tmpTail = potentialTail;

    leftNode -= k;
  }
  // if (cur === null) { /* len(head) 正好等于 n*k的时候 */
  //   tmpTail.next = null;
  // } else {
  //   tmpTail.next = cur;
  // }

  tmpTail.next = cur; // same as above


  return newHead;

};

// 上面的写法将第一次和后面剩下的节点翻转分卡了
// 可以合并一些代码，增加一个 reverseTimes 变量记录翻转次数的状态

function reverseKGroup_O(head: ListNode | null, k: number): ListNode | null {
  let leftNode = len(head);
  if (leftNode < k) return head;

  let cur = head,
    preTail = head,
    newHead = null,
    reverseTimes = 0;

  while (leftNode >= k) {

    //翻转 k 个节点
    let preNode = null;
    let nextNode = null;
    let curTail = cur; // record cur head to be next tail
    for (let i = 0; i < k; i++) {
      nextNode = cur.next;
      cur.next = preNode;
      preNode = cur;
      cur = cur.next;
    }

    reverseTimes += 1;
    if (reverseTimes === 1) {
      // 如果是第一次翻转，需要记录反转后的头，作为最终的返回值
      newHead = preNode;
    } else {
      // 不是第一次翻转，则需要把上次翻转后的链表的尾部接上这次翻转后的头
      preTail.next = preNode;
      // 然后 tempTail 变量需要更新到这次翻转后的尾部
      preTail = curTail;
    }
    leftNode -= k;
  }

  // 所有 k-group 翻转结束之后，最后一次翻转结束后的尾部接上剩下的元素
  preTail.next = cur;
  return newHead;

};

