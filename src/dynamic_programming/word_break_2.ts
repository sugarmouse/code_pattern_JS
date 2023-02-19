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
        res.push("")
        return res;
    }
    // 防治冗余计算
    if (memo[i] !== null) return memo[i]

    // 检查从下标 i 开始，能否找到一个存在于 dict 中的单词
    for (let len = 1; i + len <= s.length; len++) {
        const prefix = s.substring(i, i + len);
        // 找到一个单词匹配 s[i, i+ len)
        if (wordDict.indexOf(prefix) !== -1) {
            // subProblem 构成 s[i+len...] 的所有组合
            const subProblem = dp(s, i + len, wordDict, memo);
            // 加上 prefix 构成所有 s[i] 的组合
            for(const sub of subProblem) {
                if(sub.length === 0) {
                    res.push(prefix)
                } else{
                    res.push(prefix + " " + sub);
                }
            }
        }
    }

    memo[i] = res;
    return res;
}


export { };