// lc 1147  https://leetcode.com/problems/snapshot-array/

/*
嵌套的 map
{
    0: {
        -1: 当前没有 snap 过的数据
        0: (第 0 次 snap 的数据)
        1:
        ...
    }，
    1: {
        -1: 当前没有 snap 过的数据
        0: (第 0 次 snap 的数据)
        1:
        ...
    }
    ...
    index: {
        -1: 当前没有 snap 过的数据,
        snap_id: 对应的 snap_id 的数据
        ...
    }
}

*/

class SnapshotArray {
    data: Map<number, Map<number, number>>;
    max_snap_id: number;
    constructor(length: number) {
        this.data = new Map();
        for (let i = 0; i < length; i++) {
            const temp = new Map();
            temp.set(-1, 0);
            this.data.set(i, temp);
        }
        this.max_snap_id = 0;
    }

    set(index: number, val: number): void {
        const curIndex = this.data.get(index);
        curIndex.set(-1, val);
    }

    snap(): number {
        for (const curIndex of this.data.values()) {
            const val = curIndex.get(-1);
            curIndex.set(this.max_snap_id, val);
        }
        return this.max_snap_id++;
    }

    get(index: number, snap_id: number): number {
        return this.data.get(index).get(snap_id);
    }
}
