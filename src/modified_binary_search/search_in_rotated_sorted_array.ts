//leetcode 33  https://leetcode.com/problems/search-in-rotated-sorted-array/

// 基本思想是二分查找，所以时间复杂度是 O(log(n)),

// 关于这一题特殊的地方是只考虑排好序的一段，如果 target 在这段中，则扔掉另外一段；如果不在，则扔掉这一段
// 所以稍微难点的地方是找到判断哪一段是排序好的 判断条件

// 迭代实现

function search_iterative(nums: number[], target: number): number {
    let lo = 0, hi = nums.length - 1, mid = Math.floor((lo + hi) / 2);

    if (nums[mid] === target) return mid;

    while (lo < hi) {

        if (nums[mid] >= nums[lo]) {
            // 左边排序好的
            if (nums[mid] < target || nums[lo] > target) {
                // target 不在左边这段排序好的范围内 
                lo = mid + 1;
            } else {
                hi = mid;
            }
        } else if (nums[mid] <= nums[hi]) {
            // 右边排序好的
            if (nums[mid] > target || nums[hi] < target) {
                hi = mid - 1;
            } else {
                lo = mid;
            }
        }

        mid = Math.floor((lo + hi) / 2);
        if (nums[mid] === target) return mid;
    }

    return -1;
}


// 递归的方法实现

function search_recursive(nums: number[], target: number): number {
    return searchQuick(nums, 0, nums.length - 1, target);
}

function searchQuick(nums: number[], lo: number, hi: number, target: number): number {

    let mid = Math.floor((lo + hi) / 2);

    if (nums[mid] === target) return mid;
    if (lo === hi) return nums[lo] === target ? lo : -1;

    if (nums[mid] >= nums[lo]) {
        // 左边排序好的
        if (nums[mid] < target || nums[lo] > target) {
            // target 不在左边这段排序好的范围内 
            return searchQuick(nums, mid + 1, hi, target);
        } else {
            return searchQuick(nums, lo, mid, target);
        }
    } else {
        // 右边排序好的
        if (nums[mid] > target || nums[hi] < target) {
            return searchQuick(nums, lo, mid - 1, target);
        } else {
            return searchQuick(nums, mid, hi, target);
        }
    }
}

