// leetcode 322   https://leetcode.com/problems/coin-change/description/

// 暴力穷举，提交超时
// 时间复杂度 O(k^n),k 给定硬币个数，金额 n = amount
function coinChange(coins: number[], amount: number): number {

    return dp(coins, amount);
}
function dp(coins: number[], amount: number): number {
    if (amount < 0) return -1;
    if (amount === 0) return 0;
    let res = Infinity;
    for (const coin of coins) {
        const x = dp(coins, amount - coin);
        if (x !== -1)
            res = Math.min(res, x + 1);
    }
    return res === Infinity ? -1 : res;
}


// 加入缓存表（说是表，数组也可以
// 解决重叠子问题的重复计算问题 时间复杂度 O(kn)
function coinChange_1(coins: number[], amount: number) {
    const memo: number[] = new Array(amount + 1).fill(null);
    return dp_1(coins, amount, memo);

}

function dp_1(coins: number[], amount: number, memo: number[]) {
    if (amount < 0) return -1;
    if (amount === 0) return 0;
    if (memo[amount] !== null) return memo[amount];

    let res = Infinity;
    for (const coin of coins) {
        let x = dp_1(coins, amount - coin, memo);
        if (x === -1) continue;
        res = Math.min(res, x + 1);
    }
    memo[amount] = res === Infinity ? -1 : res;
    return memo[amount];
}


// 数组迭代法自下向上实现
// 时间复杂度 O(kn)
function coinChange_2(coins: number[], amount: number): number {
    const dp: number[] = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 0; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin < 0) continue;
            dp[i] = Math.min(dp[i - coin] + 1, dp[i]);
        }
    }
    return (dp[amount] === Infinity) ? -1 : dp[amount];
}



