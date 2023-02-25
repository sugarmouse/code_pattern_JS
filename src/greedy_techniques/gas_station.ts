// lc 134  https://leetcode.com/problems/gas-station/

// 暴力穷举，分别假设每一个站点为起点，都试着走一圈，看能不能走完一圈
// 时间复杂度 O(n^2)
// 提交不通过，某些算例会超时
function canCompleteCircuit_naive(gas: number[], cost: number[]): number {
    const n = gas.length;
    for (let i = 0; i < n; i++) {
        if (gas[i] < cost[i]) continue;

        let sumGas = 0, sumCost = 0;
        let stations = 0;
        for (let j = i; j < i + n; j++) {
            sumGas += gas[j % n];
            sumCost += cost[j % n];

            if (sumGas < sumCost) break;
            stations++;

        }
        if (stations === n) return i;
    }
    return -1;
};


// 以 0 为起点，不断计算邮箱内所剩的油（可以为负数）
// 则邮箱所剩下油最少的下一站就是可能的起点
// 最后如果 sum < 0 说明不可能
function canCompleteCiruit_graphic_method(gas: number[], cost: number[]): number {
    let sum = 0, minSum = 0;
    let start = 0;
    const n = gas.length;
    for (let i = 0; i < n; i++) {
        sum = sum + gas[i] - cost[i];
        if (sum < minSum) {
            start = i + 1;
            minSum = sum;
        }
    }

    if (sum < 0) return -1;

    return start % n;
}

// 贪心算法
// 如果选择站点i作为起点「恰好」无法走到站点j，那么i和j-1,以及中间的任意站点k都不可能作为起点。
function canCompleteCircuit_greedy(gas: number[], cost: number[]): number {
    let sum = 0;
    const n = gas.length;

    for (let i = 0; i < n; i++) {
        sum = sum + gas[i] - cost[i];
    }
    if (sum < 0) return -1;

    let tank = 0;
    let start = 0;
    for (let i = 0; i < n; i++) {
        // 走过 i 站点，走到 i+1 站点时，邮箱里剩下的油
        tank += gas[i] - cost[i];
        if (tank < 0) {
            tank = 0;
            start = i + 1;
        }
    }
    return start;
}
