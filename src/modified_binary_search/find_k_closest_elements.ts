// leetcode 658 https://leetcode.com/problems/find-k-closest-elements/


// 时间复杂度 O(n) 空间复杂度 O(1)
function findClosestElements(arr: number[], k: number, x: number): number[] {
    if (k > arr.length) return arr;
    if (x <= arr[0]) return arr.slice(0, k);
    if (x >= arr[arr.length - 1]) return arr.slice(-k);

    let lo = 0, hi = arr.length - 1;

    while (hi - lo + 1 > k) {
        if (Math.abs(arr[lo] - x) <= Math.abs(arr[hi] - x)) {
            hi--;
        } else {
            lo++;
        }
    }
    return arr.slice(lo, hi + 1);
};

// 先通过二分查找找到离 x 最近的元素，然后往两边展开，直到找到 k 个
// 时间复杂度 O(logn + k) 空间复杂度 O(1)
function findClosestElements_binary_search(nums:number[], k:number, num:number) {

    if (nums.length == k) return nums;

    let left = binarySearch(nums, num) - 1,
        right = left + 1;

    while (right - left - 1 < k) {

        if (left == -1) {
            right++;
            continue;
        }

        if (
            right == nums.length ||
            Math.abs(nums[left] - num) <= Math.abs(nums[right] - num)
        )
            left--;
        else {
            right++;
        }
    }
    return nums.slice(left + 1, right);
}

function binarySearch(nums: number[], target: number): number {
    let start = 0,
        end = nums.length - 1;

    if (start > end) return -1;

    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);

        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) start = mid + 1;
        else end = mid - 1;
    }
    return start;
}

export{}