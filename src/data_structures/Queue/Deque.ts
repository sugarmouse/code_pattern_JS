import { NoSuchElementException } from "../ErrorHandler";

/**
 * 实际上 js 提供的原生 Array 可以看成 deque 的超集
 * 但是这里 deque 的实现是把 js 原生数组看成静态数组，并且没有使用原生提供的数组 API
 * 仅供学习使用
 */

export class Deque<T> {
    private _size: number;
    private _data: T[];

    private _first: number;
    private _last: number;

    constructor(initCap: number = 2) {
        this._size = 0;
        this._data = new Array(initCap).fill(null);

        this._first = 0;
        this._last = 0;
    }

    /*** add ***/
    public addFirst(element: T) {
        if (this._size === this._data.length) {
            this.resize(2 * this._data.length);
        }

        if (this._first === 0) {
            this._first = this._data.length - 1;
        } else {
            this._first--;
        }

        this._data[this._first] = element;
        this._first++;
    }

    public addLast(element: T) {
        if (this._size === this._data.length) {
            this.resize(2 * this._data.length);
        }

        this._data[this._last] = element;

        this._last++;

        if (this._last === this._data.length) {
            this._last = 0;
        }

        this._size++;

    }

    /*** remove ***/
    public removeFirst(): T {
        if (this.isEmpty()) {
            throw new NoSuchElementException();
        }

        if (this._size <= Math.floor(this._data.length / 4)) {
            this.resize(Math.floor(this._data.length / 2));
        }

        const oldVal = this._data[this._first];

        this._data[this._first] = null;
        this._first++;
        if (this._first === this._data.length) {
            this._first = 0;
        }

        this._size--;
        return oldVal;

    }

    public removeLast(): T {
        if (this.isEmpty()) {
            throw new NoSuchElementException();
        }
        if (this._size <= Math.floor(this._data.length / 4)) {
            this.resize(Math.floor(this._data.length / 2));
        }

        if (this._last === 0) {
            this._last = this._data.length - 1;
        } else {
            this._last--;
        }

        const oldVal = this._data[this._last];
        this._data[this._last] = null;

        this._size--;
        return oldVal;
    }

    /*** get ***/
    public getFirst(): T {
        if (this.isEmpty()) {
            throw new NoSuchElementException();
        }
        return this._data[this._first];
    }

    public getLast(): T {
        if (this.isEmpty()) {
            throw new NoSuchElementException();
        }
        if (this._last === 0) {
            return this._data[this._data.length - 1];
        }
        return this._data[this._last - 1];
    }

    /*** helper ***/
    public isEmpty(): boolean {
        return this._size === 0;
    }

    public size(): number {
        return this._size;
    }

    private resize(newCap: number) {
        const temp: T[] = new Array<T>(newCap).fill(null);

        //  first-----last
        // -----last   first----
        for (let i = 0; i < this._size; i++) {
            temp[i] = this._data[(this._first + i) % this._data.length];
        }

        this._first = 0;
        this._last = this._size;
        this._data = temp;
    }

}