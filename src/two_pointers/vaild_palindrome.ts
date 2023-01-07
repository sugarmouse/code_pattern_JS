/**
 * 编写一个函数，将一个字符串s作为输入，并检查它是否是一个 palindrome string。
 * 
*/


// 时间复杂度 O(n), 空间复杂度 O(1)
/**
 * 检查一个字符串是不是 palindrome string
 * @param {string} s - 待检查的字符串
 * @returns {boolean} 输入字符串是不是 palindrome string
 */
export function vaild_palindrome(s: string): boolean {

  let start = 0;
  let end = s.length - 1;

  while (start < end) {

    if (s[start] !== s[end]) return false;

    start++;
    end--;
  }

  return true;
}


// 粗暴解法：直接将 s 反转，之后进行字符串对比
// 虽然代码看起来简单了很多，但是代码用到了新的数组，空间复杂度增加，时间复杂度取决去js内部的 Array.prototype.reverse() 函数的实现方式
/**
 * Reverse the string and compare it to the original.
 * @param {string} s - string
 * @returns A boolean value.
 */
export function vaild_palindrome_naive(s: string): boolean {
  return s.split("").reverse().join("") === s;
}
