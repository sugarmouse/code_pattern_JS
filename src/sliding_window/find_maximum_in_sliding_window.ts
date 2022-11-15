/**
 * 问题描述：
 *   给定一个整数数组和一个大小为w的窗口，当它滑过整个数组时，找出窗口中当前的最大值。
 * 
 * 注意：当窗口宽度大于数组长度时，把整个数组当成一个窗口
 * 
 * 限制：
 *   1<= array.length <= 10^3
 *   -10^4 <= array[i] <= 10^4
 *   1 <= w
 */

/**
 * Naive approach
 * naive approach 遍历整个数组，对每个窗口进行
 * 是在所有可能的窗口上进行迭代，并计算每个窗口的最大值。
*/

/**
 * 解决步骤：
 *   1. 处理前 w 个元素， 初始化输出队列
 *   2. 开始遍历数组
 *   3. 在输出数组里，只保留当前窗口的元素
 *   4. 移除所有比 输出数组中 当前元素小的数组元素
 *   5. 往数组内加入当前元素
 *   6. 
*/

export function findMaxSlidingWindow(nums: number[], windowSize: number) {

  // 初始化数据结构
  let result: number[] = [], window: number[] = [];

  // 处理空数组 input 和 windowSize 过大
  if (nums.length === 0) return result;
  if (windowSize >= nums.length) windowSize = nums.length;

  // 初始化第一个 window
  for (let index = 0; index < windowSize; index++) {
    while (window.length && nums[index] > nums[window[window.length - 1]]) {
      window.pop();
    }
    window.push(index);
  }
  result.push(nums[window[0]]);

  for (let index = windowSize; index < nums.length; index++) {
    if (window[0] <= index - windowSize) {
      window.shift();
    }
    while (window.length && nums[index] >= nums[window[window.length - 1]]) {
      window.pop();
    }
    window.push(index);
    result.push(nums[window[0]]);
  }

  return result;
}

