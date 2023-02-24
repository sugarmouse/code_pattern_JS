// lc 55 https://leetcode.com/problems/jump-game/description/


function canJump(nums: number[]): boolean {
    let max = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        // 向前走一步，每次都取最大值
        max = Math.max(max, i + nums[i]);
        // 如果遇到了 0，向前走走不动了，直接返回 false
        if (max <= i) return false;
    }

    // 走完了最后一步，看能走到的最远距离能不能到 nums 的最后一位
    return max >= nums.length - 1;

};