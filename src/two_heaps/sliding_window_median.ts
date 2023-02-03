// leetcode 480 https://leetcode.com/problems/sliding-window-median/

/**
 * 1. 创建最大堆和最小堆，最大堆中推入 k 个元素，然后往最小堆中转移 k/2 个元素
 * 2. 计算窗口中的 中位数
 * 3. 向前移动窗口
 * 4. 整理窗口：
 *    如果窗口进入元素 <= 最大堆的堆顶元素，则推入最大堆，否则推入最小堆
 *    如果窗口出去的元素等于最大堆或者最小堆的堆顶元素，则弹出该元素
 * 5. 重复以上步骤直到窗口滑动到数组结尾
 */
import { MinHeap } from "../data_structures/heap/Heap";

function medianSlidingWindow(nums: number[], k: number): number[] {
  // Your code will replace this placeholder return statement
  const ans: number[] = [];
  const maxHeap = new MinHeap(), minHeap = new MinHeap();
  const outWindownNums = new Map<number, number>();

  for (let i = k - 1; i < nums.length; i++) {
    let median;

    if (i < k) {
      // 大小堆初始化
      const half = k % 2 ? Math.floor(k / 2) : k / 2;
      for (let i = 0; i < k; i++) {
        maxHeap.add(-1 * nums[i]);
      }
      for (let i = 0; i < half; i++) {
        minHeap.add(-1 * maxHeap.peek());
        maxHeap.poll();
      }
    } else {
      let balance = 0;
      const outNum = nums[i - k];

      // 记录已经从窗口滑出，但是还在堆中的元素
      if (outWindownNums.has(outNum)) {
        outWindownNums.set(outNum, outWindownNums.get(outNum) + 1);
      } else {
        outWindownNums.set(outNum, 1);
      }

      // 处理滑动窗口划出元素
      if (outNum <= -1 * maxHeap.peek()) {
        if (outNum === -1 * maxHeap.peek()) maxHeap.poll();
        balance -= 1;
        outWindownNums.set(outNum, outWindownNums.get(outNum) - 1);
      } else {
        if (outNum === minHeap.peek()) minHeap.poll();
        balance += 1;
        outWindownNums.set(outNum, outWindownNums.get(outNum) - 1);
      }

      // 处理滑动窗口进入元素
      if (nums[i] <= -1 * maxHeap.peek()) {
        maxHeap.add(-1 * nums[i]);
        balance += 1;
      } else {
        minHeap.add(nums[i]);
        balance -= 1;
      }

      // 重新整理堆
      if (balance < 0) {
        maxHeap.add(-1 * minHeap.peek());
        minHeap.poll();
        balance += 1;
      }
      if (balance > 0) {
        minHeap.add(-1 * maxHeap.peek());
        maxHeap.poll();
        balance += 1;
      }
    }
    median = k % 2 ? -1 * maxHeap.peek() : (minHeap.peek() + -1 * maxHeap.peek()) / 2;
    ans.push(median);
  }

  return ans;
};


/**
 * naive approach will exceed Time Limit X_X
 */
function medianSlidingWindow_naive(nums: number[], k: number): number[] {

  function findMedian(nums: number[], startIndex: number, endIndex: number): number {
    const tmpNums = nums.slice(startIndex, endIndex + 1).sort((a, b) => a - b);
    return tmpNums.length % 2
      ? tmpNums[(tmpNums.length - 1) / 2]
      : (tmpNums[tmpNums.length / 2] + tmpNums[tmpNums.length / 2 - 1]) / 2;
  }

  const res = [];
  for (let i = 0; i < nums.length - k + 1; i++) {
    res.push(findMedian(nums, i, i + k - 1));
  }
  return res;
};
