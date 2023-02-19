// lc 140  https://leetcode.com/problems/word-break-ii/

// 自上而下的思想，回溯算法，利用 memo 减少时间复杂度
function wordBreak(s: string, wordDict: string[]): string[] {
    const memo = new Array(s.length).fill(null);
    return dp(s, 0, wordDict, memo);
}

// 返回用 wordDict 构成 s[i..] 的所有可能
function dp(s: string, i: number, wordDict: string[], memo: string[][]): string[] {
    const res = [];
    // base case i 等于字符串长度的时候，构成的可能只有空字符串
    // i 能走到 s.length 说明走到了多叉树的叶子节点，说明可以形成一种组合
    // 所以需要添加一个空字符串，在 '归' 的过程中用于拼接
    if (i === s.length) {
        res.push("");
        return res;
    }
    // 防治冗余计算
    if (memo[i] !== null) return memo[i];

    // 检查从下标 i 开始，能否找到一个存在于 dict 中的单词
    for (let len = 1; i + len <= s.length; len++) {
        const prefix = s.substring(i, i + len);
        // 找到一个单词匹配 s[i, i+ len)
        if (wordDict.indexOf(prefix) !== -1) {
            // subProblem 构成 s[i+len...] 的所有组合
            const subProblem = dp(s, i + len, wordDict, memo);
            // 加上 prefix 构成所有 s[i] 的组合
            for (const sub of subProblem) {
                if (sub.length === 0) {
                    res.push(prefix);
                } else {
                    res.push(prefix + " " + sub);
                }
            }
        }
    }

    memo[i] = res;
    return res;
}



// 自下而上的 dp 算法
function wordBreak_2(s: string, wordDict: string[]): string[] {
    // dp[i] 表示前 i 个元素 (包括 i) ， s[0..i) 构成句子的所有可能
    const n = s.length;
    const dp: string[][] = [];
    dp[0] = [''];  // dp[0] 用作哨兵元素，找到第一个单词的时候会和空字符串拼接

    for (let i = 1; i <= n; i++) {
        dp[i] = [];
        for (const word of wordDict) {
            const len = word.length,
                wordOfS = s.substring(i - len, i);
            // 找到 s[i-len, i) 可以组成一个单词
            // 所以将该单词与 dp[i-len] 中的每一个句子进行拼接
            if (i - len >= 0 && word === wordOfS) {
                for (const s of dp[i - len]) {
                    if (s.length === 0) {
                        // dp[0] 存放的是一个空字符串
                        // 所以这里区分首单词前面不能加空格
                        dp[i].push(wordOfS);
                    } else {
                        // s 不为空则加空格拼接
                        dp[i].push(s + " " + wordOfS);
                    }
                }
            }
        }

    }
    return dp[n];
}

export { };