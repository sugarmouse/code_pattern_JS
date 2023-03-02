import { LinkedList } from "../LinkedList/LinkedList"

/**
 * 用 Linkedlist 实现 queue
 * 也可以用 循环数组 的技巧实现，在 Deque 中有响应实现，此处不重复
 */

export class Queue<T> {
    private list:LinkedList<T>;

    constructor() {
        this.list = new LinkedList()
    }

    public offer(element: T) {
        this.list.addLast(element)
    }

    public poll():T {
        return this.list.removeLast();
    }

    public peekFirst():T {
        return this.list.getFirst();
    }

    public peekLast():T {
        return this.list.getLast();
    }
}