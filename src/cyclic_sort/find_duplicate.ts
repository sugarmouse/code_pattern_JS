// lc 287 https://leetcode.com/problems/find-the-duplicate-number/

// solve the problem without modifying the array nums and uses only constant extra space.

/* 
    环形数组问题
    当快慢指针相遇时，fast 走过的步数是 slow 的两倍，
    steps(slow) = F + n C + a （n 为整数）
    steps(fast) = F + a
        F: 进入循环之前的走的步数；
        C: 整个循环的步数
        a: 进入循环 -> 相遇点点 需要走的步数
    2 * steps(slow) = steps(fast)
        -> 2(F + a) = F + nC + a
        -> F + a = nC ( F + a 则是 相遇点在数组中的位置)
*/

/* 
    1. 快慢指针找到相遇点
    2. 慢指针归 0，快慢指针相同速度前移动，再次相遇时停止
    3. 返回 fast or slow
*/
function findDuplicate(nums: number[]): number {
    let slow = nums[0];
    let fast = nums[0];

    while(true) {
        slow = nums[slow];
        fast = nums[nums[fast]];

        if(slow === fast) {
            break;
        }
    }

    slow = nums[0];

    while(slow !== fast) {
        slow = nums[slow];
        fast = nums[fast]
    }

    return slow;

}