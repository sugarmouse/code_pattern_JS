import { NoSuchElementException } from "../ErrorHandler";

// 虽然 js 中的数组是动态数组，数组的长度可以任意改变
// 但是这里把 js 中的数组当做可不变数组使用

export class Arraylist<T> implements Iterable<T>  {

    // 存储数据的底层结构
    private _data: T[] = [];

    // 记录数组中元素的个数，也是对外展示的数组长度
    private _size: number;

    constructor(initVals?: T[]) {
        if (initVals) {
            this._data = initVals;
            this._size = initVals.length;
        }
    }

    [Symbol.iterator](): ArrayListIterator<T> {
        return new ArrayListIterator(this);
    }

    // public method

    /**
     * 
     * @returns 返回 ArrayList 的长度
     */
    public size() {
        return this._size;
    }

    /**
     * 检查 ArrayList 是否为空
     * @returns 若 ArrayList 元素个数为 0，返回 true, 否则返回 false
     */
    public isEmpty(): boolean {
        return this._size === 0;
    }

    /**
     * 
     * 在 ArrayList 末尾添一个元素
     * @param {T} e 需要添加的元素
     * @return void
     */
    public addLast(e: T): void {
        if (this._data.length === this._size) {
            this.resize(this._data.length * 2);
        }
        this._data[this._size] = e;
        this._size++;
    }

    /**
     * 查询某个 index 对应的元素
     * @param {number} index 需要查询的 index
     * @returns index 对应的元素
     */
    public get(index: number): T {
        this.checkElementIndex(index);
        return this._data[index];
    }

    /**
     * 修改某个 index 对应的值
     * @param {number} index 需要修改的 index
     * @param {T} element index 对应元素的新的值
     * @returns index 对应元素的旧的值
     */
    public set(index: number, element: T): T {
        this.checkElementIndex(index);
        const oldVal = this._data[index];
        this._data[index] = element;
        return oldVal;
    }


    /**
     * 
     * @param {number} index - The index at which the specified element is to be inserted
     * @param {T} element - The element to be added to the list.
     */
    public add(index: number, element: T) {
        this.checkPositionIndex(index);
        for (let i = 0; i < this._size; i++) {
            if (i >= index) {
                this._data[i + 1] = this._data[i];
            }
        }
        this._data[index] = element;
        this._size++;

    }



    public remove(index: number): T {
        this.checkElementIndex(index);

        if (this._size < this._data.length / 4) {
            this.resize(this._data.length / 2);
        }

        const oldVal = this._data[index];
        for (let i = 0; i < this._size; i++) {
            if (i >= index) this._data[i] = this._data[i + 1];
        }

        this._data[this._size - 1] = null;
        this._size--;
        return oldVal;

    }

    public removeLast(): T {
        if (this.isEmpty()) {
            throw new NoSuchElementException();
        }

        if (this._size < this._data.length / 4) {
            this.resize(this._data.length / 2);
        }
        const deletedValue = this._data[this._size - 1];
        this._data[this._size - 1] = null;
        this._size--;
        return deletedValue;
    }



    /**私有函数 */

    private isElementIndex(index: number): boolean {
        return index >= 0 && index < this._size;
    }

    // 
    private isPositionIndex(index: number) {
        return index >= 0 && index <= this._size;
    }


    // 检查 index 索引位置是否可以存在元素
    private checkElementIndex(index: number) {
        if (!this.isElementIndex(index))
            throw new RangeError(`Index out of boundary: index ${index}, size ${this._size} `);
    }

    // 检查 index 索引位置是否可以添加元素
    private checkPositionIndex(index: number) {
        if (!this.isPositionIndex(index))
            throw new RangeError(`Index out of boundary: index ${index}, size ${this._size} `);
    }

    // 将数组大小扩容或缩容为 newCap
    private resize(newCap: number) {
        let tmp: T[] = new Array<T>(newCap);
        tmp = this._data.slice(0, this._size);
        this._data = tmp;
    }
}

class ArrayListIterator<T> implements Iterator<T> {
    private index: number;
    private done: boolean;

    constructor(private values: Arraylist<T>) {
        this.index = 0;
        this.done = false;
    }
    next(): IteratorResult<T, T> {

        if (this.index === this.values.size()) {
            this.done = true;
            return {
                done: this.done,
                value: undefined
            };
        }

        const value = this.values.get(this.index);
        this.index += 1;
        return {
            done: false,
            value
        };
    }
}
