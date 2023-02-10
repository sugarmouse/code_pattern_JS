// leetcode 17  https://leetcode.com/problems/letter-combinations-of-a-phone-number/


function letterCombinations(digits: string): string[] {

    const nums = ["0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"],
        ans: string[] = [],
        indexes = digits.split("").map(s => Number(s));

    // 特例处理
    if (digits.length === 0) return [];

    // base case
    if (indexes.length === 1) {
        return nums[indexes[0]].split('');
    }

    // 获取第一个数字的对应字符
    const n = indexes.pop(),
        letters = letterCombinations(n.toString());

    // 获取剩下的数字对应字符
    const restLeeters = letterCombinations(indexes.join(""));

    // 将第一个数字对应的字符 和 后面的字符连接起来
    for (const preLetter of letters) {
        for (const restLeeter of restLeeters) {
            ans.push(restLeeter.concat(preLetter));
        }
    }

    return ans;
}