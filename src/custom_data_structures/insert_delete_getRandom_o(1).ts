// lc 380 https://leetcode.com/problems/insert-delete-getrandom-o1/

/*
{
    val: index;
}

[val1, val2....]

insert 直接往数组后插入元素，并且在 map 记录 元素对应的 index
remove 将需要删除的元素交换到数组末尾，直接 pop。同时记得更新交换元素之后的 index
getRandom 生成一个[0, vals.length -1] 的随机数，直接从 vals 数组获取

*/

class RandomizedSet {
    valToIndex: Map<number, number>;
    vals: number[];

    constructor() {
        this.valToIndex = new Map();
        this.vals = [];
    }

    insert(val: number): boolean {
        if (this.valToIndex.has(val)) return false;

        this.valToIndex.set(val, this.vals.length);
        this.vals.push(val);
        return true;
    }

    remove(val: number): boolean {
        if (!this.valToIndex.has(val)) return false;

        const lastIndex = this.vals.length - 1,
            lastVal = this.vals[lastIndex],
            curIndex = this.valToIndex.get(val);

        // 交换对尾元素和当前需要删除的元素
        [this.vals[lastIndex], this.vals[curIndex]] = [this.vals[curIndex], this.vals[lastIndex]];

        // 更新 map
        this.valToIndex.set(lastVal, curIndex);

        // 删除元素，map 和 array 都要删除
        this.valToIndex.delete(val);
        this.vals.pop();

        return true;
    }

    getRandom(): number {
        const length = this.vals.length;
        const random = Math.trunc(length * Math.random());
        return this.vals[random];
    }
}
