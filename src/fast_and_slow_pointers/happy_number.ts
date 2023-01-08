/**
 * 输入：
 *    n: number
 * 
 * 输出：
 *    boolean
 * 
 * 问题描述：
 *    重复的计算输入参数 n 的各个位的数的平方和，若最终等于 1 则为happy number，返回 true;
 *    如果最终进入了循环并且没有等于 1，则不是 happy number，返回 false。
 */


/**
 * 解题思路：
 *    1. 初始化变量 slow = n, fast = SqureSumOfDigits(n)
 *    2. 当 slow ！== fast 时进入循环，slow 向前走一步， fast 走两步
 *    3. fast 跑在前面，所以如果最后能等于 1 的话，肯定是 fast 先到达，所以比较 fast 和 1，
 *        如果相等说明满足条件，返回 true，不相等则进入下一次训话
 *    4. 当快慢指针相遇时，说明出现的循环，所以终止循环，返回 false
 * 
 * 时间复杂度：
 *    O(log(n))
 * 
 * 空间复杂度：
 *    O(1)
 */

/**
 * 快慢指针法检查输入参数是否是 happy number
 * @param {number} n - 待检测的参数
 * @returns boolean
 */
export function isHappyNumber(n: number): boolean {
  if (n === 1) return true;

  let slow = n, fast = SquareSumOfDigits(n);

  while (fast !== slow) {
    slow = SquareSumOfDigits(slow);
    fast = SquareSumOfDigits(SquareSumOfDigits(fast));
    if (fast === 1) return true;
  }
  return false;
}


/**
 * naive 方法：
 *    1. 初始化一个 set 用来记录每次平方和的的数据
 *    2. 如果 set 不存在 n 则进入循环，将 n 存入 set，之后计算 n = SquareSumOfDigits(n)
 *    3. 每次计算完成之后结果与 1 比较，等于 1 则直接返回 true，结束程序；不等于则进入下一次循环
 *    4. 当 set 中发现了重复的 n，则结束循环，返回 false
 * 
 * 时间复杂度：
 *    O(logn)
 * 
 * 空间复杂度：
 *    O(n)
 */


/**
 * naive 方法检查是否为 happy number：用一个 set 记录每次平方和的的数据
 * @param {number} n - 输入参数 n
 * @returns boolean
 */
export function isHappyNumberNaive(n: number): boolean {

  if (n === 1) return true;
  const set: Set<number> = new Set();

  while (!set.has(n)) {
    set.add(n);
    n = SquareSumOfDigits(n);
    if (n === 1) return true;
  }

  return false;

}


/**
 * 计算输入参数的各位数字的平方和
 * @param {number} num - 输入参数
 * @returns 输入参数的各位数字的平方和
 */
function SquareSumOfDigits(num: number): number {
  let sum = 0;
  while (num > 0) {
    sum = sum + Math.pow(num % 10, 2);
    num = Math.floor(num / 10);
  }
  return sum;
}