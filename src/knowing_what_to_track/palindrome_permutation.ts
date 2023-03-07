// lc 266  https://leetcode.com/problems/palindrome-permutation/

function permutePalindrome(st: string): boolean {
    const map = new Map<string, number>();
    let odd = 0;

    for (const char of st) {
        map.has(char)
            ? map.set(char, map.get(char) + 1)
            : map.set(char, 1);
    }

    for (const [char, times] of map.entries()) {
        if (times % 2) {
            odd += 1;
        }
        if (odd > 1) return false;
    }
    return true;
}