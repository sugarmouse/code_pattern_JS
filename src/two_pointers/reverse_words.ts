/**
 * 输入：
 *    sentence: string
 * 输出： 
 *    string
 * 将输入的句子反转，保持单个单词不变
 * 比如：
 *    "hello world" -> "world hello"
 */

/**
 * 1. 反转真个 sentence 字符串
 * 2. 开始遍历整个反转后的字符串，使用两个指针 start 和 end
 * 3. 遍历的过程中，检查单词之间的空格
 * 4. 当发现空格，更新 end 指针
 * 5. 然后用双指针反转两个指针内的单词
 * 6. 单词反转成功后，找到下一个空格，更新 start 和 end 指针
 * 7. 重复步骤 3-6 直到整个 sentence 遍历结束
 * 
 * 时间复杂度：
 *   O(n + n) = O(n)
 * 空间复杂度：
 *   O(n)
*/

/**
 * 反转整个句子字符串，之后反转句子中的每一个单词
 * @param {string} sentence - 带反转的句子
 * @returns 反转后的句子
 */
export function reverseWords(sentence: string): string {

  const sentenceList = sentence.trim().replace(/\s+/g, ' ').split('');

  let strLen = sentenceList.length;

  let reversedSentenceList = strRev(sentenceList, 0, strLen - 1);

  let start = 0, end = 0;

  while (true) {

    while (start < strLen && reversedSentenceList[start] === " ") start++;

    if (start === strLen) break;

    end = start + 1;
    while (end < strLen && reversedSentenceList[end] !== " ") end++;

    reversedSentenceList = strRev(reversedSentenceList, start, end - 1);
    start = end;
  }


  return reversedSentenceList.join("");
}

/** 
 * 利用 js 内置的 api 一行代码解决
 * 1. Trim the sentence with String.prototype.trim().
 * 2. Replace all whitespace with a single space with String.prototype.replace().
 * 3. Split the sentence into an array of words with String.prototype.split().
 * 4. Reverse the array of words with Array.prototype.reverse().
 * 5. Join the array of words back into a sentence with Array.prototype.join().
*/

/**
 * 反转句子，保持单词不变
 * @param {string} sentence - 带反转的句子
 * @returns 反转后的句子
 */
export function reverseWordsWithBuiltinApi(sentence: string): string {
  return sentence.trim().replace(/\s+/g, ' ').split(" ").reverse().join(" ");
}


/**
 * 双指针方法反转 list 的指定序列
 * @param {T[]} list - 待处理的 list
 * @param {number} startRev - 反转片段的开始 index
 * @param {number} endRev - 反转片段的结束 index
 * @returns 指定序列成功反转后的 list
 */
function strRev<T>(list: T[], startRev: number, endRev: number) {
  while (startRev < endRev) {
    [list[startRev], list[startRev]] = [list[endRev], list[endRev]];
    startRev += 1;
    endRev -= 1;
  }
  return list;
}