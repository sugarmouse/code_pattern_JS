// lc 416  https://leetcode.com/problems/partition-equal-subset-sum/

// 将问题转化为在数组中书否能找到某几个元素凑成和正好为 sum / 2, 从而转化为类似 01 背包客问题
// 状态：元素个数，背包容量  选择：需要第 i 个元素，不需要第 i 个元素

function canPartition(nums: number[]): boolean {
    const n = nums.length;
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2) return false;
    const half = sum / 2;

    const dp = [];
    // dp[i][j] 表示前 i 个元素中的能否凑出正好值为 sum/2
    for (let i = 0; i <= n; i++) {
        dp.push(new Array(half + 1).fill(false));
        dp[i][0] = true;
    }

    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= half; j++) {
            if (j - nums[i-1] < 0) {
                dp[i][j] = dp[i - 1][j];
            } else {
                // 只要两种选择有一种为 true 则 dp[i][j] 为 true
                dp[i][j] =
                    dp[i - 1][j - nums[i-1]]  // 要 i
                    || dp[i - 1][j]; // 不要 i
            }
        }
    }
    return dp[n][half];
};