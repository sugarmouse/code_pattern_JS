// lc 136  https://leetcode.com/problems/single-number/description/

function singleNumber(nums: number[]): number {
    let res = 0;
    for (const n of nums) {
        res = res ^ n;
    }
    return res;
};