// lc 496  https://leetcode.com/problems/next-greater-element-i/


/**
 * We use a stack to find the next greater element for each element in the array, and then we use a map
 * to store the index of each element in the array
 * @param {number[]} nums1 - 
 * @param {number[]} nums2 - 
 * @returns The next greater element in the array.
 */
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const map = new Map<number, number>();
    const nge = helper(nums2);
    const n = nums2.length;
    const res: number[] = [];

    for (let i = 0; i < n; i++) {
        map.set(nums2[i], nge[i]);
    }

    nums1.forEach(item => {
        res.push(map.get(item));
    });

    return res;
};


/**
 * We maintain a stack of elements that are in decreasing order, and for each element, we pop all the
 * elements that are smaller than it, and the next greater element of the current element is the top
 * element of the stack
 * @param {number[]} nums 
 * @returns The next greater element of each element in the array.
 */
function helper(nums: number[]): number[] {
    const n = nums.length;
    const res: number[] = new Array(n).fill(null);
    // 维护 nums[i..] 之间的单调递增的元素
    const s = [];

    for (let i = n - 1; i >= 0; i--) {
        // 比当前元素小的元素出栈，则栈顶元素就是 nums[i] 的 next greater element
        while (s.length !== 0 && s[s.length - 1] < nums[i]) {
            s.pop();
        }

        res[i] = s.length === 0 ? -1 : s[s.length - 1];
        s.push(nums[i]);

    }
    return res;
}