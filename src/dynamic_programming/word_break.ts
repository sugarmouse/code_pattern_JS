//lc 139  https://leetcode.com/problems/word-break/description/

// 检查一个字符串能否被拆分成句子
// dp 方法，去除回溯法的重复子问题的结算，减少时间复杂度
function wordBreak(s: string, wordDict: string[]): boolean {
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= n; i++) {
        for (const word of wordDict) {
            if (i - word.length >= 0)
                dp[i] = dp[i]
                    || (dp[i - word.length] && wordDict.indexOf(s.slice(i - word.length, i)) >= 0);
        }
    }
    return dp[n];
};



// 加了存储空间的递归方法 
function wordBreak_dp_recursive(s: string, wordDict: string[]): boolean {
    const memo = new Array(s.length).fill(-1);
    return dp(s, 0, wordDict, memo);
}
// 返回 s[i..] 是否能被拆分成句子
function dp(s: string, i: number, wordDict: string[], memo: number[]): boolean {
    if (i === s.length) return true; // 
    if (memo[i] !== -1) return memo[i] === 0 ? false : true;

    // 检查从下标 i 开始，能否找到一个存在于 dict 中的单词
    for (let len = 1; i + len <= s.length; len++) {
        const prefix = s.substring(i, i + len);

        // 如果找到了单词，将 memo[i] 做好标记，表示从 s[i..i + len） 是一个单词
        if (wordDict.indexOf(prefix) !== -1) {
            // 继续求解子问题，也就是剩下的 s[i+len, ...] 能不能组成句子
            const subProblem = dp(s, i + len, wordDict, memo);
            if (subProblem === true) {
                memo[i] = 1;
                return true;
            }
        }
    }

    memo[i] = 0;
    return false;
}



// 回溯法，lc 提交会超时
function wordBreak_backtracking(s: string, wordDict: string[]): boolean {
    let found = false;
    const track: string[] = [];
    backtrack(s, 0);
    return found;

    /**
     * If we can find a word in the dictionary that matches the current substring, then we recursively call
     * the function with the substring starting at the end of the word we just found
     * @param {string} s - the string we're trying to break down
     * @param {number} i - the index of the string we are currently at
     * @returns the words that make up the sentence.
     */
    function backtrack(s: string, i: number) {
        if (found) return;

        if (i === s.length) {
            found = true;
            return;
        }

        for (const word of wordDict) {
            let len = word.length;
            if (i + len <= s.length && s.substring(i, i + len) === word) {
                track.push(word);
                backtrack(s, i + len);
                track.pop();
            }
        }
    }
}





export { };