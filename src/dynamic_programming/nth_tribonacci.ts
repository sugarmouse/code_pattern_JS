// lc 1137 https://leetcode.com/problems/n-th-tribonacci-number/description/

function tribonacci(n: number): number {
    const dp = [0,1,1]
    if (n < 3) return dp[n];

    for (let i = 3; i <= n; i++) {
        const n = dp[0] + dp[1] + dp[2];
        dp.shift();
        dp.push(n);
    }
    return dp.pop();
};