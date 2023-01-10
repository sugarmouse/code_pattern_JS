// leetcode 457  https://leetcode.com/problems/circular-array-loop/description/

/**
 * 有一个前置思想，从某个点出发的路线是确定的，在不出现转向的条件下，最终只有两种情况
 *      1） 形成环
 *      2） 在某一点形成了单点循环
 * 
 * 所以快慢指针最终一定会是相遇，所以只要不出现转向就让快慢指针一直往前移动
 * 当两指针相遇的时候，再判断是单点循环，还是符合题目要求的 circle
 * 
 * 题解 1 中有个线路置零的操作，基本思想是：
 * 
 *    既然每个点出现的路线是固定的，当快慢指针相遇的时候，此条线路上任意一点出发，最终都是单点循环。
 *    所以可以将此线路上所有的点置零，在下一次进入数组遍历循环时直接过滤掉，减少了计算成本
 * 
 * 时间复杂度：
 *    O(n)
 *    每个点至多遍历四次，其中快指针两次，慢指针一次，置零标记一次。
 * 
 * 空间复杂度：
 *    O(1)
 *    只需要常数的空间保存若干变量。
 */

/**
 * 检查是否为 circular array
 * @param {number[]} nums - 待检查的数组
 * @returns boolean
 */
export function circularArrayLoop_1(nums: number[]) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {

    // 虽然题目中说明 nums 数组中不存在 0，但是在后面的线路置零操作中使某些元素等于 0 了
    if (nums[i] === 0) continue;

    // 初始化指针
    let slow = i, fast = next(nums, i);

    // 当不出现转向的时候，进入循环
    //    nums[slow] * nums[fast] > 0 说明 node(n+i) 和 node(2n+i) 同号
    //    nums[slow] * nums[next(nums, fast)] > 0 说明 node(n+i) 和 node(2n+1+i) 同号
    while (nums[slow] * nums[fast] > 0 && nums[slow] * nums[next(nums, fast)] > 0) {

      // 当出现 slow 和 fast 相遇的时候，此次循环必定退出
      if (slow === fast) {
        if (slow !== next(nums, slow)) {
          return true;
        } else {
          // 出现单点循环则结束此循环
          // 进行线路置零
          break;
        }
      }
      slow = next(nums, slow);
      fast = next(nums, next(nums, fast));
    }

    // 经过此条线路上的点不满足要求，则以之后经过此线路上的出发点都不会满足要求，所以将线路上的点全部置零
    // 所以下次当有出发点的线路经过此条线时，直接出现单点循环从而退出此次循环，节省运算时间
    // 没有以下线路置零的操作也能通过测试，但是运算时间大大增加，相当于对一条线路会重复测试多次
    let add = i;
    while (nums[add] * nums[next(nums, add)] > 0) {
      const tmp = add;
      add = next(nums, add);
      nums[tmp] = 0;
    }
  }
  return false;
}



type Direction = "left" | 'right';
/**
 * 与解法 1 不同的是，在调往下一步的过程中进行转向和单点循环的检查
 * @param {number[]} nums - 待检查的数组
 * @returns boolean
 */
export function circularArrayLoop_2(nums: number[]): boolean {

  for (let i = 0; i < nums.length; i++) {
    let curDir: Direction = nums[i] >= 0 ? "right" : "left";
    let slow = i, fast = i;

    // slow 和 fast 没有相遇， 没有出现单点循环， 没有出现方向反转，指针往前走
    while (fast !== slow || slow !== -1 || fast !== -1) {

      slow = nextWithCheck(nums, slow, curDir);
      // 出现单点循环或者方向反转，跳出
      if (slow === -1) break;

      fast = nextWithCheck(nums, fast, curDir);
      if (fast !== -1) {
        fast = nextWithCheck(nums, fast, curDir);
      }
      // 如果出现了 指针相遇，单点循环，转向， 跳出
      if (fast === slow || fast === -1) break;
    }

    if (fast === slow && slow !== -1) return true;

  }
  return false;
}


/**
 * 暴力解法：
 *    把每次经过点的index 入栈，往下一步走的时候检查该点是否已经路过过
 *    如果路过过，则检查现在的 index 是否与栈顶元素相同，
 *        相同则说明出现了单点循环，跳出次循环，从 i+1 开始进入下一次
 *        不相同则说明出现了 circle ， 返回 true
 *    遍历整个数组之后如果都没有找到符合要求的，则返回 false
 * @param {number[]} nums - an array of numbers
 * @returns A boolean value.
 * 
 * 此方法空间复杂度 O(n)，在leetcode 提交不成功。
 */
export function circularArrayLoopNaive(nums: number[]): boolean {

  for (let i = 0; i < nums.length; i++) {
    const passedPointList = [];
    let add = i;
    while (nums[add] * nums[next(nums, add)] > 0) {
      passedPointList.push(add);
      add = next(nums, add);
      if (passedPointList.indexOf(add) > 0) {
        if (passedPointList.indexOf(add) !== passedPointList.length - 1) {
          return true;
        } else {
          break;
        }
      }
    }
  }
  return false;
}


/**
 * 计算下一个点的 index
 * @param {number[]} nums - 数组
 * @param {number} cur - 当前点的 index
 * @returns 到达的下一个点的 index
 */
function next(nums: number[], cur: number): number {
  const n = nums.length;
  // 如果 cur + nums[cur] >= 0, 则直接 mod, 范围 [0,n)
  // 如果 cur + nums[cur] < 0, 则 mod 之后保证处于 （-n ,0] ; 再加 n ， ( 0, n ] ; mod n 之后范围 (0, n)
  return ((cur + nums[cur]) % n + n) % n;
}


/**
 * 如果当前点的下一跳方向变化或者下一跳指向自身，返回 -1；否则返回下一跳的 index
 * @param {number[]} nums - 数组
 * @param {number} cur - 当前点的 index
 * @param {Direction} curDirect - 当前路线起始方向
 * @returns 如果当前点的下一跳方向变化或者下一跳指向自身，返回 -1；否则返回下一跳的 index
 */
function nextWithCheck(nums: number[], cur: number, curDirect: Direction): number {
  let nextDirect = nums[cur] >= 0 ? 'right' : "right";
  if (nextDirect !== curDirect) return -1;
  const nextIndex = ((nums[cur] + cur) % nums.length + nums.length) % nums.length;
  return nextIndex === cur ? -1 : nextIndex;
}