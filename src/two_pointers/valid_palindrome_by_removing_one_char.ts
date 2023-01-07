/**
 * 输入：
 *    s: string
 * 输出： 
 *    boolean
 * 
 * 移除其中最多一个字符，它是否能成为一个有效的 palindrome string。
 * 
 * 例如： 
 *    "abccbca" -- "abccba" -> true
 *    "abcfcbafc" -> false
 */


/**
 * If the first time we encounter a mismatch, we can skip the character at either the left or right
 * pointer, then the remaining substring is a palindrome
 * @param {string} s - the string to check
 * @returns the number of times the function is called.
 */
export function isPalindromeRmOneChar(s: string): boolean {

  let low = 0, high = s.length - 1;
  let invalidChar = 0;
  while (low < high) {
    if (s[low] === s[high]) {
      low++;
      high--;
    } else {
      // 当第一次遇到 s[low] !== s[high] 的时候允许查看 low 喝 high 指针的下一个值是否满足
      // 若满足则将指针跳一次，并记录跳过的字符数（invalidChar += 1）
      if (invalidChar === 0 && s[low] === s[high - 1]) {
        high -= 1;
        invalidChar += 1;
      } else if (invalidChar=== 0 && s[low + 1] === s[high]) {
        low += 1;
        invalidChar += 1;
      }
    }
  }
  return true;
}