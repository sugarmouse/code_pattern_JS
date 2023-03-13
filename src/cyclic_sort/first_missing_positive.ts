// lc 41  https://leetcode.com/problems/first-missing-positive/description/

// [0, 1, -1, 3, 5] -> [1, 0, 3,-1, 5] -> anser is 2

function firstMissingPositive(nums: number[]): number {

    let index = 0;
    const n = nums.length;
    while (index < n) {
        const v = nums[index];
        if (v > 0 && v < n + 1 && v !== index + 1 && v !== nums[v - 1]) {
            [nums[index], nums[v - 1]] = [nums[v - 1], nums[index]];
        } else {
            index += 1;
        }
    }

    for (const [i, v] of nums.entries()) {
        if (i + 1 !== v) return i + 1;
    }
    return n + 1;
};
