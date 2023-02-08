//leetcode 540   https://leetcode.com/problems/single-element-in-a-sorted-array/description/




function singleNonDuplicate(nums: number[]): number {
    let left = 0, right = nums.length - 1;
    let mid;
      
    while (left < right) {
        mid = Math.floor((right + left / 2));

        // 确保 mid 是偶数，则 mid 左边有偶数个元素
        // 所以 整个数组被分成了 [o,mid) 偶数个元素部分 和 （mid, right] 偶数个元素部分
        if (mid % 2) mid -= 1;
        
        // nums[mid] 和哪边相邻的元素相等，则 target 在就哪边
        if(nums[mid] === nums[mid + 1]) {
            left = mid + 2;
        } else {
            right = mid;
        }
    }
    return nums[left];
}





function singleNonDuplicate_recursive(nums: number[]): number {
    if (nums.length === 1) return nums[0];
    return binarySearch(nums, 0, nums.length - 1);

};

function binarySearch(nums: number[], left: number, right: number): number {
    if (left === right) return nums[left];

    let mid = Math.floor((left + right) / 2);

    if (Math.floor((right - left + 1) / 2) % 2) {
        // 奇数
        if (nums[mid] === nums[mid - 1]) {
            return binarySearch(nums, mid + 1, right);
        } else if (nums[mid] === nums[mid + 1]) {
            return binarySearch(nums, left, mid - 1);
        } else {
            return nums[mid];
        }
    } else {
        // 偶数
        if (nums[mid] === nums[mid - 1]) {
            return binarySearch(nums, left, mid);
        } else if (nums[mid] === nums[mid + 1]) {
            return binarySearch(nums, mid, right);
        } else {
            return nums[mid];
        }

    }
}

export { };