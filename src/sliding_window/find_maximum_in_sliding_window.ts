// leetcode 239 https://leetcode.com/problems/sliding-window-maximum/

/**
 * 问题描述：
 *   给定一个整数数组和一个大小为w的窗口，当它滑过整个数组时，找出窗口中当前的最大值。
 * 
 * 注意：当窗口宽度大于数组长度时，把整个数组当成一个窗口
 * 
 * 限制：
 *   1<= array.length <= 10^3
 *   -10^4 <= array[i] <= 10^4
 *   1 <= k
 */




/**
 * 解决步骤：
 *    1.找到第一个窗口中的最大元素
 *      不找出第一个窗口的最大元素就无法找到单调队列的头，所以第一个窗口必须与后面的数组元素分开操作
 *    2.遍历数组，用双端队列记录数组中呈单调递增的元素的下标
 *    3.把不在窗口内的下标从队列头 shift 出去，此时处在队列头部的下标就是当前窗口中最大元素的下标
 * 
 * 时间复杂度：
 *    O( k + n )
 * 
 * 空间复杂度：
 *    O(k)
 * 
 */
/**
 * 双端队列（单调队列）法找出滑动窗口的最大值
 * @param {number[]} nums - 数字数组
 * @param {number} k - 窗口大小
 * @returns 每个窗口的最大值构成的数组
 */
export function findMaxSlidingWindow(nums: number[], k: number): number[] {
  // 窗口大小重置
  k = k > nums.length ? nums.length : k;

  // 初始化单调队列
  const q: number[] = [];

  // 找到前 k 个元素（第一个窗口）的最大值，并且下标保存在双端队列 q 中
  for (let i = 0; i < k; i++) {
    while (q.length > 0 && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(i);
  }

  const ans: number[] = [nums[q[0]]];

  // 
  for (let i = k; i < nums.length; i++) {
    // 如果当前元素大于队列尾部对应的元素，将队列尾部弹出
    // 直到队列尾部对应的元素大于当前元素，或者队列为空
    while (q.length > 0 && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    // 遍历到 nums[i] 时，不管 nums[i] 与队列尾部对应
    q.push(i);
    // 清除单调队列中不在窗口范围内的元素
    while (q.length > 0 && q[0] <= i - k) {
      q.shift();
    }
    ans.push(nums[q[0]]);
  }
  return ans;
};



/**
 * naive approach 遍历整个数组，找出一个窗口，然后找出每个窗口的最大值
 * 
 * 时间复杂度：
 *      O(N * K)
 * 空间复杂度：
 *      O(1)
*/

export function findMaxSlidingWindowNaive(nums: number[], k: number): number[] {
  const findMax = (nums: number[], low: number, high: number) => {
    let max = nums[low];
    for (let i = low; i <= high; i++) {
      max = max >= nums[i] ? max : nums[i];
    }
    return max;
  };

  const n = nums.length;
  const ans = [];
  k = k > n ? n : k;

  for (let i = 0; i <= n - k; i++) {
    ans.push(findMax(nums, i, i + k - 1));
  }
  return ans;
}
