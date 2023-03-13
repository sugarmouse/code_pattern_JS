// lc 155 https://leetcode.com/problems/min-stack/

// 两个栈分别记录元素，和最小元素对应的下标

class MinStack {
    stack: number[];
    minIndexes: number[];
    size = 0;

    constructor() {
        this.stack = []
        this.minIndexes = [];
        this.size = 0;
    }

    push(val: number): void {
        this.stack.push(val);
        if (this.size === 0) {
            this.minIndexes.push(0);
        } else {
            const lastMinIndex = this.minIndexes[this.size - 1];
            if (val < this.stack[lastMinIndex]) {
                this.minIndexes.push(this.size)
            } else {
                this.minIndexes.push(lastMinIndex)
            }
        }

        this.size++;
    }

    pop(): void {
        this.stack.pop();
        this.minIndexes.pop();

        this.size--;
    }

    top(): number {
        return this.stack[this.size - 1];
    }

    getMin(): number {
        return this.stack[this.minIndexes[this.size - 1]];
    }
}
