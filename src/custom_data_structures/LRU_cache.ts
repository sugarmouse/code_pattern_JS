// lc 146  https://leetcode.com/problems/lru-cache/

// 有限的存储空间， put 方法推入元素的时候如果存储空间不够，删掉最远处

// {key: KVNode} 和 DoubleLinkedList 同时存储数据，达到 put 和 get 方法同时 TC O(1);

class LRUCache {
    map: Map<number, KVNode>;
    cahce: DoubleList;
    cap: number;

    constructor(capacity: number) {
        this.map = new Map();
        this.cahce = new DoubleList();
        this.cap = capacity;
    }

    get(key: number): number {
        if (!this.map.has(key)) {
            return -1;
        }
        this.makeRecently(key);
        return this.map.get(key).val;
    }

    put(key: number, value: number): void {
        if (this.map.has(key)) {
            this.deleteKey(key);
            this.addRecently(key, value);
            return;
        }

        if (this.cap === this.cahce.size()) {
            this.removeLeastRecently();
        }

        this.addRecently(key, value);
    }

    // 每次操作的 节点 放到双链表的末尾
    private makeRecently(key: number) {
        const x = this.map.get(key);
        this.cahce.remove(x);
        this.cahce.addLast(x);
    }

    private addRecently(key: number, val: number) {
        const x = new KVNode(key, val);
        this.map.set(key, x);
        this.cahce.addLast(x);
    }

    // 同时删除链表和map中对应的 key
    private deleteKey(key: number) {
        const x = this.map.get(key);

        this.cahce.remove(x);
        this.map.delete(key);
    }

    private removeLeastRecently() {
        const node = this.cahce.removeFirst();

        if (node !== null) {
            const key = node.key;
            this.map.delete(key);
        }
    }
}


class KVNode {
    key: number;
    val: number;
    next: KVNode | null;
    prev: KVNode | null;
    constructor(k: number, v: number) {
        this.key = k;
        this.val = v;
        this.next = null;
        this.prev = null;
    }
}

class DoubleList {
    head: KVNode;
    tail: KVNode;
    _size: number;

    constructor() {
        this.head = new KVNode(0, 0);
        this.tail = new KVNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this._size = 0;
    }

    addLast(node: KVNode) {
        node.prev = this.tail.prev;
        node.next = this.tail;

        this.tail.prev.next = node;
        this.tail.prev = node;

        this._size++;
    }

    remove(x: KVNode) {
        x.prev.next = x.next;
        x.next.prev = x.prev;

        x.next = null;
        x.prev = null;

        this._size--;
    }

    removeFirst(): KVNode | null {
        if (this.head.next === this.tail) return null;
        const first = this.head.next;
        this.remove(first);
        return first;
    }

    size() {
        return this._size;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */



export { };