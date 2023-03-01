import { NoSuchElementException } from "../ErrorHandler";

export class LinkedList<T> {

    private _head: ListNode<T> | null;
    private _tail: ListNode<T> | null;
    private _size: number;

    constructor() {
        this._head = new ListNode<T>(null);
        this._tail = new ListNode<T>(null);

        this._head.next = this._tail;

        this._size = 0;
    }

    /*** 增 ***/

    public addFirst(e: T): void {
        const x = new ListNode<T>(e);
        const temp = this._head.next;

        x.next = temp;
        x.prev = this._head;

        this._head.next = x;
        temp.prev = x;

        this._size++;
    }

    public addLast(e: T) {
        const x = new ListNode<T>(e);
        const temp = this._tail.prev;

        x.next = this._tail;
        x.prev = temp;

        this._tail.prev = x;
        temp.next = x;

        this._size++;
    }

    public add(index: number, element: T) {
        this.checkPositionIndex(index);

        const x = new ListNode<T>(element);

        const p = this.getNode(index);
        const temp = p.prev;

        x.next = p;
        x.prev = temp;

        p.prev = x;
        temp.next = x;

        this._size++;
    }

    /*** 删 ***/
    public removeFirst(): T {
        if (this.isEmpty()) throw new NoSuchElementException();

        const x = this._head.next;
        const temp = x.next;

        this._head.next = temp;
        temp.prev = this._head;

        x.next = null;
        x.prev = null;

        this._size--;

        return x.val;
    }

    public removeLast(): T {
        if (this.isEmpty()) throw new NoSuchElementException();

        const x = this._tail.prev;
        const temp = x.prev;

        temp.next = this._tail;
        this._tail.prev = temp;

        x.next = null;
        x.prev = null;

        this._size--;

        return x.val;
    }

    public remove(index: number) {
        this.checkElementIndex(index);

        const x = this.getNode(index);
        const prev = x.prev, next = x.next;

        prev.next = next;
        next.prev = prev;

        x.next = null;
        x.prev = null;

        this._size--;
    }

    /*** 查 ***/
    public getFirst(): T {
        if (this.isEmpty()) throw new NoSuchElementException();
        return this._head.next.val;
    }

    public getLast(): T {
        if (this.isEmpty()) throw new NoSuchElementException();
        return this._tail.prev.val;
    }

    public get(index: number): T {
        this.checkElementIndex(index);
        return this.getNode(index).val;
    }

    /*** 改 ***/
    public set(index: number, element: T):T {
        this.checkElementIndex(index);
        const p = this.getNode(index);
        const oldVal = p.val;
        p.val = element;
        return oldVal;
    }

    /*** helper ***/

    private size(): number {
        return this._size;
    }

    public isEmpty() {
        return this._size === 0;
    }

    private isElementIndex(index: number): boolean {
        return index >= 0 && index < this._size;
    }

    private isPositionIndex(index: number) {
        return index >= 0 && index <= this._size;
    }

    private checkElementIndex(index: number) {
        if (!this.isElementIndex(index))
            throw new NoSuchElementException();

    }

    private checkPositionIndex(index: number) {
        if (!this.isPositionIndex(index))
            throw new NoSuchElementException();
    }

    /**
     * Get the node at the specified index.
     * 
     * The first thing we do is check if the index is valid. If it's not, we throw an error
     * @param {number} index - The index of the element to return.
     * @returns The node at the given index.
     */
    private getNode(index: number): ListNode<T> | null {
        this.checkElementIndex(index);
        let p = this._head.next;
        for (let i = 0; i < index; i++) {
            p = p.next;
        }
        return p;
    }

}

export class ListNode<V = number> {
    val: V;
    next: ListNode<V> | null;
    prev: ListNode<V> | null;

    constructor(val: V) {
        this.val = val;
    }
}