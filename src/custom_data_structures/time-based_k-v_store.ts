// lc 981 https://leetcode.com/problems/time-based-key-value-store/description/

class TimeMap {
    data: Map<string, Map<number, string>>
    constructor() {
        this.data = new Map();
    }

    set(key: string, value: string, timestamp: number): void {
        if (!this.data.has(key)) {
            this.data.set(key, new Map());
        }
        const tmp = this.data.get(key);
        tmp.set(timestamp, value);
    }

    get(key: string, timestamp: number): string {
        if (!this.data.has(key)) return "";
        const vals = this.data.get(key);
        let dest = -1;
        for (const time of vals.keys()) {
            if(time <= timestamp && time > dest) {
                dest = time
            }
        }
        return dest === -1 ? "" : vals.get(dest);
    }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
