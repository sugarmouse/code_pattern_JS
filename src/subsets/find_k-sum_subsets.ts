// Given a set of positive integers,
// find all the possible subsets of integers that sum up to a number k. 

// 等于子集问题加上一个过滤条件

function getKSumSubsets(setOfIntegers: number[], targetSum: number): number[][] {

    const result: number[][] = [],
        track: boolean[] = new Array(setOfIntegers.length).fill(false);

    backtracking(setOfIntegers, targetSum, result, track, 0);
    return result;

    function backtracking(nums: number[], target: number, result: number[][], track: boolean[], index: number) {

        const tmp = new Array();
        for (let i = 0; i < nums.length; i++) {
            if (track[i]) tmp.push(nums[i]);
        }
        if (tmp.reduce((a, b) => a + b, 0) === target) result.push(tmp);

        for (let i = 0; i < nums.length; i++) {
            track[i] = true;
            backtracking(nums, target, result, track, i + 1);
            track[i] = false;
        }
    }
}