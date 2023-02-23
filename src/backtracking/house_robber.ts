// lc 198 https://leetcode.com/problems/house-robber/

// down -> top
function rob_1(nums: number[]): number {
    const n = nums.length;
    // dp[i] 表示前面 i 个房子可以安全打劫到的最大金额；
    const dp = new Array(n + 1).fill(null);
    dp[0] = 0;
    dp[1] = nums[0];
    if (n >= 2) dp[2] = Math.max(nums[0], nums[1]);


    for (let i = 3; i <= n; i++) {
        dp[i] = Math.max(
            nums[i - 1] + dp[i - 2],  // 如果选择在 i 进行打劫
            dp[i - 1]    // 如果在 i 不打劫
        );
    }

    return dp[n];

};

// top -> down
function rob_2(nums: number[]): number {
    const memo = new Array(nums.length + 1).fill(null);
    return dp(nums, memo, 0);

};

// dp 函数返回 start 到 最后一家可以打劫到的最大金额
function dp(nums: number[], memo: number[], start: number): number {

    const n = nums.length;
    if (start >= n) {
        memo[start] = 0;
        return 0;
    }
    if (memo[start] !== null) return memo[start];

    let res = Math.max(
        dp(nums, memo, start + 1), // 在 start 处不抢
        nums[start] + dp(nums, memo, start + 2) // 在 start 处抢
    )
    memo[start] = res;
    return memo[start];
}

export{}