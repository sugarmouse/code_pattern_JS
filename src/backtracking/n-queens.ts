// lc 51  https://leetcode.com/problems/n-queens/description/

// 核心思想就是回溯算法进行全排列
// 加上对不符合要求的排列方式进行过滤

function solveNQueens(n: number): string[][] {
    const res: string[][] = [],
        record: number[] = [];
    backtrack(n, res, record);
    return res;
};

function backtrack(n: number, res: string[][], record: number[]) {

    if (record.length === n) {
        res.push([]);
        // 到达最后一个节点
        const s = new Array(n).fill('.');
        for (const i of record) {
            s[i] = 'Q';
            res[res.length - 1].push(s.join(''));
            s[i] = '.';
        }
        return;
    }

    for (let i = 0; i < n; i++) {
        // 过滤在同一列出现 q 的可能
        if (record.includes(i)) continue;
        // 过滤左上方和右上方出现 q 的可能
        if (!isValid(record, i)) continue;
        record.push(i);
        backtrack(n, res, record);
        record.pop();
    }
}


function isValid(record: number[], current: number): boolean {
    const curRow = record.length, curCol = current;
    // 检查左右上方是否有皇后冲突
    for (let i = 0; i < record.length; i++) {
        if (curRow - i === Math.abs(curCol - record[i])) return false;
    }
    return true;
}