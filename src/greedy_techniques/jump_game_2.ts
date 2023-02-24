// lc 55  https://leetcode.com/problems/jump-game-ii/


// dp method
// time complexity: O(n^2)
function jump(nums: number[]): number {
    const n = nums.length;
    // 因为从 0 到 1 最多是 n-1 步， 而题目也确定了一定能走到 n-1
    // 所以 n 一定是大于所需要的步数的，相当于设置成 Infinity
    const memo: number[] = new Array(n).fill(n);
    return dp(nums, 0, memo);
}

//函数返回 从索引 p 跳到最后一格至少需要 dp(nums, p) 步
function dp(nums: number[], p: number, memo: number[]): number {
    const n = nums.length;

    // base case 在最后一个点时，需要走 0 步就到目的地
    if (p >= n - 1) return 0;

    // 防止多余计算
    if (memo[p] !== n) return nums[p];

    // 当前能走的最多的距离
    const step = nums[p];

    // 从 [1..step] 距离内随便走多远
    for (let i = 1; i <= step; i++) {
        // 当前这一步走完之后，剩下还要走的最少步数
        const restStep = dp(nums, i + step, memo);
        // 取最小值
        memo[p] = Math.min(memo[p], restStep + 1);
    }
    // 将当前值返回
    return memo[p];
}



// greedy method
function jump_greedy(nums: number[]): number {
    const n = nums.length;
    let end = 0, // end 表示当前点能到达的最远距离
        farthest = 0, // [{i | i + nums[i] = end}， end] 之间的点能到达的最远距离
        steps = 0; // 记录所走的步数

    for (let i = 0; i < n - 1; i++) {
        farthest = Math.max(nums[i] + i, farthest);

        // 当 i 超过 end 的时候，需要往前走一步
        // 至于选择走到哪一个点，是取在 [{i | i + nums[i] = end}， end] 区间范围内可以走的最远的点
        // 这个点 不一定是 end，但由于在 区间范围内的点都是一步可达，所以在遍历到 end 的时候再走下一步 step 和 下一个 end 是可以的
        if (end === i) {
            steps++;
            end = farthest;
        }
    }
    return steps;
}
