/**
 * 输入：
 *    nums: number[]
 *    target: number
 * 输出： 
 *    boolean
 * 
 * 如果数组中存在三个数字的和等于 target，返回 true，否则返回 false
 */

/**
 * 1.第一步是对输入数组进行排序。
 * 2.遍历整个数组，设置两个指针 low = i+1, high = nums.length - 1
 * 3.在一个内层循环中，比较 nums[i] + nums[low] + nums[high] 和 target
 * 4.   如果三者之和等于目标值，返回true。
 * 5.   如果三个数字的总和大于目标值，把 high 向前移动。
 * 6.   否则，如果三个数字的总和小于目标值，把 low 向后移动。
 * 7.   当 low >= high 的时候，终止内层循环
 * 8.整个遍历过程结束后如果没有匹配项，则返回 false
 * 
 * 时间复杂度：
 *   O(nlog(n) + n^2)
 * 空间复杂度：
 *   O(1)
*/


/**
 * 对输入的数组进行排序，然后用双指针的模式寻找是否存在三数之和等于target
 * @param {number[]} nums - 数组
 * @param {number} target - 目标
 * @returns 一个表示是否存在的 boolean 值
 */
export function findSumOfThree(nums: number[], target: number): boolean {

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {

    let low = i + 1;
    let high = nums.length - 1;

    while (low < high) {
      const sum = nums[i] + nums[low] + nums[high];
      if (sum === target) return true;
      else if (sum > target) high--;
      else low++;
    }
  }

  return false;
}



/** 
 * naive 方法：
 *   三层嵌套循环的方式找出每一种组合方式并计算三数之和是否等于 target
 * 时间复杂度：
 *   O(n^3)
 * 空间复杂度：
 *   O(1)
*/

/**
 * 三层嵌套循环的方式寻找数组内是否存在三数之和等于target
 * @param {number[]} nums - 数组
 * @param {number} target - 目标
 * @returns 一个表示是否存在的 boolean 值
 */
export function findSumOfThreeNaive(nums: number[], target: number): boolean {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] + nums[k] === target) return true;
      }
    }
  }
  return false;
}