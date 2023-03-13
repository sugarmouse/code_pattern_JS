// lc 268 https://leetcode.com/problems/missing-number/

/* 
    [3,0,2] -> [0,2,3] -> anser is 1
*/

function missingNumber(nums: number[]): number {

    const n = nums.length;
    let index = 0;

    while (index < n) {
        const val = nums[index];

        if (val < n && val !== index) {
            // 当前元素小于 n，且不在其对应的 index 上时，对齐换位
            [nums[val], nums[index]] = [nums[index], nums[val]]
        } else {
            index += 1;
        }
    }

    for (const [i, v] of nums.entries()) {
        if (i !== v) return i;
    }

    return n;

};

// a ^ a = 0
function missingNumber_bitwiseManipulate(nums:number[]):number {
    let res = 0;
    const n = nums.length;
    res ^= n;

    for(const [i, v] of nums.entries()) {
        res ^= i ^ v;
    }
    return res;
}