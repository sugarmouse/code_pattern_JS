// leetcode 46  https://leetcode.com/problems/permutations/

function permute_0(nums: number[]) {

    function permute_recursive(nums: number[], currentIndex: number, result: number[][]) {
        // 当指针到达数组的最后一个元素时将其推入结果
        if (currentIndex === nums.length - 1)
            result.push(nums);

        // 将数组的当前元素与之后的每一个元素互换位置 
        for (var index = currentIndex; index < nums.length; index++) {
            // 必须得 copy，否则后面的递归操作的都是同一个 nums 数组，会导致结果错误
            let copy = [...nums];
            [copy[currentIndex], copy[index]] = [copy[index], copy[currentIndex]];
            permute_recursive(copy, currentIndex + 1, result);
        }
    }

    let result: number[][] = [];
    permute_recursive(nums, 0, result);
    return result;
}


// 回溯法全排列,用 一个 boolean 数组记录对应的状态
function permute_1(nums: number[]): number[][] {

    function backtacking(nums: number[], track: number[], used: boolean[], result: number[][]): void {

        if (track.length === nums.length) {
            result.push([...track]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            // 前置动作
            if (used[i]) continue;
            track.push(nums[i]);
            used[i] = true;

            backtacking(nums, track, used, result);
            // 后置动作
            track.pop();
            used[i] = false;
        }
    }

    const result: number[][] = [],
        track: Array<number> = [],
        used: Array<boolean> = new Array(nums.length).fill(false);

    backtacking(nums, track, used, result);

    return result;

};


// 也是回溯法全排列，直接用数组长度记录状态，控制 base case 退出
function permute_2(nums: number[]): number[][] {
    let result: number[][] = [];

    // base case
    if (nums.length === 1) return [[...nums]];

    for (let i = 0; i < nums.length; i++) {
        let n = nums.shift();
        let perms = permute(nums);

        for (let perm of perms)
            perm.push(n);
        result.push(...perms);
        nums.push(n);

    }
    return result;
}



