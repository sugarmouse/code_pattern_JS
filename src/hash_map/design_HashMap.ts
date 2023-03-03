// lc 706  https://leetcode.com/problems/design-hashmap/description/


class MyHashMap {
    private keySpace: number;
    private buckets: Bucket[];

    constructor(keySpace: number = 1000) {
        this.keySpace = keySpace;
        this.buckets = Array(keySpace).fill(null);
    }

    put(key: number, value: number): void {
        if (key === null || value === null) return;

        let hashKey = key % this.keySpace;
        this.initBucket(hashKey);
        this.buckets[hashKey].update(key, value);
    }

    get(key: number): number {
        if (key === null) return -1;
        let hashKey = key % this.keySpace;
        this.initBucket(hashKey);
        return this.buckets[hashKey].get(key);
    }

    remove(key: number): void {
        let hashKey = key % this.keySpace;
        this.initBucket(hashKey);
        this.buckets[hashKey].remove(key);
    }

    initBucket(hashKey: number) {
        if (this.buckets[hashKey] === null) {
            this.buckets[hashKey] = new Bucket();
        }
    }
}


class Bucket {
    private bucket: [key: number, value: number][];
    constructor() {
        this.bucket = [];
    }

    get(key: number): number {
        let value = -1;
        this.bucket.forEach((pair) => {
            if (pair[0] === key) value = pair[1];
        });
        return value;
    }

    update(key: number, value: number) {
        let found = false;

        for (let i = 0; i < this.bucket.length; i++) {
            let pair = this.bucket[i];
            if (key === pair[0]) {
                this.bucket[i] = [key, value];
                found = true;
                break;
            }
        }

        if (!found) {
            this.bucket.push([key, value]);
        }
    }

    remove(key: number) {
        for (let i = 0; i < this.bucket.length; i++) {
            let pair = this.bucket[i];
            if (pair[0] === key) this.bucket.splice(i, 1);
        }
    }

}
