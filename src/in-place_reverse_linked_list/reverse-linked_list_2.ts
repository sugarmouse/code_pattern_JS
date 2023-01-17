import { ListNode } from "../data_structures/linked-list/ListNode";

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if (right === left) return head;
  let index = 1;
  let cur = head;
  let tmpTail = null;
  let tmpHead = null;
  let reversedTail = null;

  let next = null;
  let pre = null;

  while (cur !== null) {
    if (left === 1 || index === left - 1) {
      tmpTail = cur;
    }
    if (index === right + 1) {
      tmpHead = cur;
    }
    if (index >= left && index <= right) {
      if (index === left) reversedTail = cur;
      next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    } else {
      cur = cur.next;
    }
    ++index;
  }

  if (left !== 1) tmpTail.next = pre;
  reversedTail.next = tmpHead;

  return left == 1 ? pre : head;
};


function reverseBetween2(head: ListNode | null, left: number, right: number) {

  // 特例处理
  if (left >= right || head === null) {
    return head;
  }

  // 添加一个 dummy node 接在 head 之前，并且将 head 移动到 dummy node 上
  // 这是为了取消 left = 1 和 left ！= 1 两种情况下第一次翻转之后 后续行为 的差异
  let dummy = new ListNode(0);
  dummy.next = head;
  head = dummy;

  // 找到翻转的起始点
  // 此时 head 指向 left - 1 node 
  for (let i = 1; i < left; ++i) {
    if (head === null) return null;
    head = head.next;
  }

  let premNode = head, // 记录 left - 1 node，为了跟翻转后的 right node 连接
    mNode = head.next, // left node
    nNode = mNode,  // 指向 left node
    postnNode = mNode.next; // 指向 left + 1  node

  // 翻转 left 至 right 
  for (let i = left; i < right; i++) {
    let temp = postnNode.next;
    postnNode.next = nNode;
    nNode = postnNode;
    postnNode = temp;
  }

  // 翻转结束之后，nNode指向 right node，postn 和 tmp 指向 right + 1
  mNode.next = postnNode;
  premNode.next = nNode;

  return dummy.next;

}

