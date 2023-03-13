// lc 460 https://leetcode.com/problems/lfu-cache/

// The functions get and put must each run in O(1) average time complexity.


class LFUCache {
    keyToVal: Map<number, number>;
    keyToFreq: Map<number, number>;
    freqToKeys: Map<number, Set<number>>;

    minFreq: number;
    cap: number;

    constructor(capacity: number) {
        this.keyToFreq = new Map();
        this.keyToVal = new Map();
        this.freqToKeys = new Map();

        this.cap = capacity;
        this.minFreq = 1;
    }

    get(key: number): number {
        if (!this.keyToVal.has(key)) return -1;

        const oldFreq = this.keyToFreq.get(key);
        this.increaseFreq(key);

        return this.keyToVal.get(key);
    }

    put(key: number, value: number): void {

        if (!this.keyToVal.has(key) && this.keyToVal.size >= this.cap) {
            // 超出，进行删除操作
            this.deleteLFU();
        }

        this.keyToVal.set(key, value);
        this.increaseFreq(key);

    }

    private deleteLFU() {
        const toDeletedVals = this.freqToKeys.get(this.minFreq);

        // 找到需要删除的 freq 对应的所有 key，删除第一个
        const deleteKey = toDeletedVals.values().next().value;

        // 分别从三个 map 中删除对应 key
        this.keyToFreq.delete(deleteKey);
        this.keyToVal.delete(deleteKey);
        toDeletedVals.delete(deleteKey);

        // 如果删除过后 minFreq 对应的 keyList 为空则删除对应的 freq 项
        if (toDeletedVals.size === 0) {
            this.freqToKeys.delete(this.minFreq);
        }
    }

    /**
     * 调整 key 对应的 frequency 和 this.minFreq;
     * @param {number} key - 需要调整频次的 key
     */
    private increaseFreq(key: number): void {
        const oldFreq = this.keyToFreq.has(key) ? this.keyToFreq.get(key) : 0;
        const newFreq = oldFreq + 1;

        // 如果是之前存在的 key，需要从旧的频次中删除
        if (oldFreq !== 0) {

            this.freqToKeys.get(oldFreq).delete(key);

            // 如果删除之后整个频次对应的 set 为空，需要将整个 freq 项删除
            if (this.freqToKeys.get(oldFreq).size === 0) {
                this.freqToKeys.delete(oldFreq);

                // 如果旧的频次正好等于 最小频次，需要将最小频次加 1（因为最小频次对应列表已经没有元素了）
                if (this.minFreq === oldFreq) this.minFreq++;
            }
        } else {
            this.minFreq = 1;
        }

        // 维护 k2f 表
        this.keyToFreq.set(key, newFreq);

        // 维护 f2ks 表
        if (!this.freqToKeys.has(newFreq))
            this.freqToKeys.set(newFreq, new Set());

        this.freqToKeys.get(newFreq).add(key);
    }
}

export { };