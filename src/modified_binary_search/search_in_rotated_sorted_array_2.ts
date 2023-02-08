// leetcode 81  https://leetcode.com/problems/search-in-rotated-sorted-array-ii/

// 和 leetcode 33 很相似，就是多了一个 nums[mid] = nums[lo] = nums[hi] 的特殊情况

function search(nums: number[], target: number): boolean {

    let lo = 0, hi = nums.length - 1;


    while (lo <= hi) {

        let mid = Math.floor((lo + hi) / 2);
        if (nums[mid] === target) return true;

        if (nums[lo] === nums[mid] && nums[hi] === nums[mid]) {
            lo++;
            hi--;
        } else if (nums[lo] <= nums[mid]) {
            // 左半边排序好的
            if (nums[lo] <= target && nums[mid] > target)
                hi = mid - 1;
            else
                lo = mid + 1;
        } else {
            // 右半边排序好的
            if ((nums[mid] < target) && (nums[hi] >= target))
                lo = mid + 1;
            else
                hi = mid - 1;
        }
    }

    return false;


};