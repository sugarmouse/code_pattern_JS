// lc 895 https://leetcode.com/problems/maximum-frequency-stack/

class FreqStack {
    
    // 记录每个元素的出现次数
    eleCount: Map<number, number>;
    // 记录每个次数出现过的每个元素
    freqToVals: Map<number, number[]>;
    // 元素出现的次数的最大数
    maxFreq: number;

    constructor() {
        this.eleCount = new Map();
        this.freqToVals = new Map();
        this.maxFreq = 0;
    }

    push(val: number): void {

        // 设置 {value: frequency}
        let freq = this.eleCount.get(val) ? this.eleCount.get(val) + 1 : 1;
        this.eleCount.set(val, freq);

        // 设置 {frequency: [value ...]}
        if (!this.freqToVals.has(freq))
            this.freqToVals.set(freq, []);
        this.freqToVals.get(freq).push(val);

        // 更新 max frequency
        this.maxFreq = Math.max(this.maxFreq, freq);
    }

    pop(): number {

        // 找到 max frequency 对应的元素表
        const vals = this.freqToVals.get(this.maxFreq);
        // 弹出最近的 push 进去的那个
        let v = vals.pop();

        // 弹出之后，更新对应元素的 frequecny {value: frequency}
        let freq = this.eleCount.get(v) - 1;
        this.eleCount.set(v, freq);

        // 更新 max frequency
        if (vals.length === 0) {
            this.freqToVals.delete(this.maxFreq);
            this.maxFreq--;
        }

        return v;

    }
}

export { };