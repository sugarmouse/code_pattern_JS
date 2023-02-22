// lc 213  https://leetcode.com/problems/house-robber-ii/

// 在 house robber 1 的基础上把数组换成了环形数组，也就是 首尾 两个房子也算作相邻，不可以同时抢
// 选择 去头去尾 两种情况比较

function rob(nums: number[]): number {
    const n = nums.length;

    if (n === 1) return nums[0];

    return Math.max(
        robRange(nums, 0, n - 2), // 去尾
        robRange(nums, 1, n - 1) // 去头
    );
}

// 返回从 nums[start...end] 能抢劫到的最大金额
function robRange(nums: number[], start: number, end: number) {
    let cur = 0, tmp1 = 0, tmp2 = 0;
    for (let i = end; i >= start; i--) {
        cur = Math.max(tmp1, nums[i] + tmp2);
        tmp2 = tmp1
        tmp1 = cur;
    }
    return cur;
}


