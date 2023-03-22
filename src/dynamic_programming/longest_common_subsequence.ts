// lc 1143 https://leetcode.com/problems/longest-common-subsequence/description/

function longestCommonSubsequence(text1: string, text2: string): number {
    const l1 = text1.length, l2 = text2.length;
    // dp[i][j] 表示 text1[0..i-1] 和 text2[0..i-1] 的最长公共子序列
    const dp = [];
    for (let i = 0; i <= l1; i++) {
        // 初始值全复制为 0
        // 正好 dp[0][x] 和 dp[x][0] 及为初始值，等于 0
        dp.push(new Array(l2 + 1).fill(0));
    }

    for (let i = 1; i <= l1; i++) {
        for (let j = 1; j <= l2; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[l1][l2];
};