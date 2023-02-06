// leetcode 215 https://leetcode.com/problems/kth-largest-element-in-an-array/description/

// Given an integer array nums and an integer k, return the kth largest element in the array.
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
// You must solve it in O(n) time complexity.

// 可以用最小堆来做，但是时间复杂度不满足要求。实现与 top k frequent element 之类的题目类似

// 其实就是找排序后的数组 下标为 nums.length - k 的元素， 即 sortedNums[nums.length - k]
// 分治思想，类似与快速排序算法，但是只关心特定的元素，而不需要排列整个数组

function findKthLargest(nums: number[], k: number): number {
    return quickSelect(nums, 0, nums.length - 1, nums.length - k);
};

/**
 * We partition the array into two parts, one part is smaller than the pivot, the other part is larger
 * than the pivot. Then we check if the index of the pivot is the same as the index we want to find. 
 * 
 * If it is, we return the pivot. 
 * If it is not, we check if the index we want to find is smaller than the index of the pivot. 
 * then recursivly find the index element we want.
 * 
 * @param {number[]} nums - the array we're searching through
 * @param {number} left - the left index of the array
 * @param {number} right - the last index of the array
 * @param {number} destIndex - the index of the element we want to find
 * @returns the value of the variable 'a'
 */
function quickSelect(nums: number[], left: number, right: number, destIndex: number):number {
    let pivot = nums[right], p = left;

    // 把数组分成小于 pivot 和 大于 pivot 的两部分
    for (let i = left; i < right; i++) {
        if (nums[i] <= pivot) {
            [nums[i], nums[p]] = [nums[p], nums[i]];
            p++;
        }
    }
    // 把 pivot 放到两部分的中间
    [nums[p], nums[right]] = [nums[right], nums[p]];

    // p === index 时， nums[p] 就是要找的元素
    if (p === destIndex) return nums[p];
    // 如果要找的 index < p
    else if (p < destIndex) return quickSelect(nums, p + 1, right, destIndex);
    // index > p
    else return quickSelect(nums, left, p - 1, destIndex);
}
