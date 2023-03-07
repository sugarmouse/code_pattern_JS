// lc 409  https://leetcode.com/problems/longest-palindrome/

function longestPalindrome(s: string): number {
    const map = new Map<string, number>();
    let hasOdd = false;
    let len = 0;

    for (const char of s) {
        if (map.has(char)) {
            map.set(char, map.get(char) + 1);
        } else {
            map.set(char, 1);
        }
    }

    for (const [char, times] of map.entries()) {
        if (times % 2) {
            len += times - 1;
            hasOdd = true;
        } else {
            len += times;
        }
    }

    return hasOdd ? len + 1 : len;
};