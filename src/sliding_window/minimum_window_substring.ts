// leetcode 727 https://leetcode.com/problems/minimum-window-substring/

/**
 * 给出字符串str1和str2，找出str1的最小（连续）子串subStr，使str2的每个字符在subStr中出现的顺序与str2中出现的顺序相同。
 * 
 * 时间复杂度：
 *     O(n+m)
 * 
 * 空间复杂度：
 *    O(m)
 */

export function minWindow(s: string, t: string): string {
  const map = new Map<string, number>();
  let numsLen = Infinity;
  let ans = ""
  let slow = 0, fast = 0;

  for (let i of t) {
    map.set(i, map.get(i) ? map.get(i) + 1 : 1);
  }
  let needLen = map.size;

  while (fast < s.length) {

    // 寻找上界限
    if (map.has(s[fast])) {
      map.set(s[fast], map.get(s[fast]) - 1);
      if (map.get(s[fast]) === 0) needLen -= 1;
    }

    // 上界找到之后找下界
    while (needLen === 0) {
      if (map.has(s[slow])) {
        map.set(s[slow], map.get(s[slow]) + 1);
        if (map.get(s[slow]) > 0) needLen += 1;
      }
      // 每次记录符合要求的 ans 和 ans.length
      if (numsLen > fast - slow + 1) {
        numsLen = fast - slow + 1;
        ans = s.slice(slow, fast + 1)
      }
      slow++;
    }
    fast++;
  }
  return ans;

};