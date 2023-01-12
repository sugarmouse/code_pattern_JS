// leetcode 3  https://leetcode.com/problems/longest-substring-without-repeating-characters/


// Intuition
// hasp map 记录窗口走过的字母数量

// Approach
// 初始化两个指针，start，end
// 当窗口内元素数量都小于等于 1 时，更新 map，更新 ans，同时向前移动 end 指针
// map 内出现大于 1 的值，移动 start 指针，同时更新 map，直到 map 内所有的 val 都 小于等于 1
// 当 end 指针移动到 是，length + 1 时结束循环，返回 ans
// Complexity
// Time complexity:
// O(n)

// Space complexity:
// O(n)
export function lengthOfLongestSubstring_1(s: string): number {

  let start = 0, end = 0;
  let ans = 0;
  const map = new Map<string, number>();

  const isRepeat = (map: Map<string, number>, s: string): boolean => {
    if (map.get(s) && map.get(s) >= 1) return true;
    return false;
  };

  while (end < s.length) {
    // 当有重复的时候 移动 start
    while (isRepeat(map,s[end])) {
      // 修改 map 
      map.set(s[start], map.get(s[start]) - 1);
      start++;
    }
    // 没重复移动 end
    ans = Math.max(ans, end - start + 1);
    map.set(s[end], map.get(s[end]) ? map.get(s[end]) + 1 : 1);
    end++;
  }
  return ans;
};


// 改进，可以用 set，因为只关心有没有 > 1

export function lengthOfLongestSubstring_2(s: string): number {

  let start = 0, end = 0;
  let ans = 0;
  const set = new Set<string>();

  while (end < s.length) {

    while (set.has(s[end])) {
      set.delete(s[start]);
      start++;
    }
    ans = Math.max(ans, end - start + 1);
    set.add(s[end]);
    end++;
  }
  return ans;
};