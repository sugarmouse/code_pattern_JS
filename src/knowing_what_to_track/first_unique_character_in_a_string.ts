// lc 387  https://leetcode.com/problems/first-unique-character-in-a-string/

function firstUniqChar(s: string): number {

    const len = s.length;
    const map = new Map<string, number>();

    for (let i = 0; i < len; i++) {
        const times = map.has(s[i]) ? map.get(s[i]) + 1 : 1;
        map.set(s[i], times);
    }

    for (let i = 0; i < len; i++) {
        if (map.get(s[i]) === 1) return i;
    }
    return -1;
};